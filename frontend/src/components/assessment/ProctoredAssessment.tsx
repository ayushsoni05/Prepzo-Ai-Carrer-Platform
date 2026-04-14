import toast from 'react-hot-toast';
import { Boxes } from '@/components/ui/background-boxes';
// --- Local definitions for missing types ---
import { 
  TestAnalysisResult 
} from '@/data/intelligentAIEngine';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced';
  explanation?: string;
  skillTags?: string[];
  companyAskedIn?: string;
  section?: string;
}

interface Section {
  id: string;
  name: string;
  icon: string;
  timeLimit: number;
  questions: Question[];
}

interface Violation {
  type: string;
  description: string;
  severity: string;
}

// Use real question bank configuration and helper
// Test configuration is provided by AI service; do not use local question bank

// Build minimal test config from user profile for AI generator
function buildTestConfig(user: any) {
  const field = user?.fieldOfStudy || user?.stream || 'Computer Science';
  const defaultSections: Section[] = [
    {
      id: `${field}-aptitude`,
      name: 'Aptitude',
      icon: '🧮',
      timeLimit: 25,
      questions: [],
    },
    {
      id: `${field}-dsa`,
      name: 'DSA',
      icon: '🌳',
      timeLimit: 25,
      questions: [],
    },
    {
      id: `${field}-dbms`,
      name: 'DBMS',
      icon: '🗄️',
      timeLimit: 25,
      questions: [],
    },
    {
      id: `${field}-os`,
      name: 'Operating Systems',
      icon: '⚙️',
      timeLimit: 25,
      questions: [],
    },
    {
      id: `${field}-cn`,
      name: 'Computer Networks',
      icon: '🌐',
      timeLimit: 25,
      questions: [],
    },
    {
      id: `${field}-oops`,
      name: 'OOPS',
      icon: '🔷',
      timeLimit: 25,
      questions: [],
    },
  ];

  return {
    questionsPerSection: 5, // Reduced from 20 for faster dynamic generation
    totalTime: 120, // 20 min × 6 sections
    includeInterviewLevel: true,
    includeAssessmentLevel: true,
    targetRole: user?.targetRole || 'Software Engineer',
    fieldOfStudy: field,
    field: field,
    degree: user?.degree || 'B.Tech',
    skillRatings: user?.skillRatings || {},
    knownTechnologies: user?.knownTechnologies || [],
    company: undefined,
    sections: defaultSections,
  };
}

// Import React hooks and AnswerReviewPanel
import { useState, useEffect, useRef, useCallback } from 'react';
import AnswerReviewPanel from '@/components/assessment/AnswerReviewPanel';
import { FALLBACK_SECTIONS } from '@/data/fallbackQuestions';
import { useProctoring } from '@/hooks/useProctoring';
import { motion } from 'framer-motion';
// import toast from 'react-hot-toast'; (duplicate removed)
// Inline missing types for questionApi and related
interface SubmitAnswer {
  questionId: string;
  selectedOption: number;
  timeSpent: number;
}

interface APIQuestion {
  _id: string;
  questionText: string;
  options: Array<{ text: string; isCorrect: boolean }>;
  explanation?: string;
  difficulty: string;
  weight?: number;
}

interface TestConfig {
  targetRole: string;
  fieldOfStudy: string;
  field: string;
  questionsPerSection: number;
  totalTime?: number; // minutes
  includeInterviewLevel?: boolean;
  includeAssessmentLevel?: boolean;
  sections: Section[];
  degree?: string;
}

interface GeneratedTest {
  test: {
    testId: string;
    sections: Array<{
      section: string;
      sectionTime: number;
      questions: APIQuestion[];
    }>;
  };
}

// questionApi implementation: calls backend AI test generation
const questionApi = {
  generateTest: async (config: TestConfig): Promise<GeneratedTest> => {
    const token = localStorage.getItem('prepzo-token');
    const headers: any = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const resp = await api.post('/ai-test/generate', { testConfig: config }, { headers, timeout: 60000 });
    // Backend returns { success: true, data: { sessionId, testId, test } }
    const data = resp.data?.data || resp.data;
    return { test: data.test, sessionId: data.sessionId, testId: data.testId } as any;
  },
  submitTest: async (_: any) => ({ recommendations: [] }),
};

import { useAuthStore } from '@/store/authStore';
// import toast from 'react-hot-toast';
import api from '@/api/axios';
import { 
  Target, Shield, Clock, AlertTriangle, ChevronRight, ChevronLeft, 
  CheckCircle, Camera, Mic, Award, Maximize, Play, Monitor, XCircle, BookOpen, 
  TrendingUp, TrendingDown 
} from 'lucide-react';
import ThinkingLoader from '@/components/ui/loading';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/utils/cn';

interface ProctoredAssessmentProps {
  testMode?: 'field' | 'skills';
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface TestState {
  sections: {
    section: Section;
    questions: Question[];
    answers: Record<string, number>;
    answersWithTime: SubmitAnswer[];
    completed: boolean;
    timeSpent: number;
  }[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  totalTime: number;
  timeRemaining: number;
  status: 'setup' | 'permissions' | 'ready' | 'active' | 'paused' | 'completed' | 'terminated' | 'loading';
  sessionId: string | null;
  testId: string | null;
  isApiMode: boolean;
}

export const ProctoredAssessment = ({ testMode, onComplete, onBack }: ProctoredAssessmentProps) => {
  const { user, updateUser } = useAuthStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [testConfig] = useState<TestConfig>(() => buildTestConfig(user));

  const [testState, setTestState] = useState<TestState>({
    sections: [],
    currentSectionIndex: 0,
    currentQuestionIndex: 0,
    totalTime: (testConfig.totalTime ? testConfig.totalTime * 60 : 60 * 60), // seconds
    timeRemaining: (testConfig.totalTime ? testConfig.totalTime * 60 : 60 * 60),
    status: 'setup',
    sessionId: null,
    testId: null,
    isApiMode: false,
  });
  
  const [showInstructions, setShowInstructions] = useState(true);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [testAnalysis, setTestAnalysis] = useState<TestAnalysisResult | null>(null);
  const [results, setResults] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    attemptedQuestions: number;
    unattemptedQuestions: number;
    accuracyRate: number;
    score: number;
    sectionResults: {
      name: string;
      total: number;
      correct: number;
      attempted: number;
      unattempted: number;
      score: number;
      accuracyRate: number;
    }[];
    violations: Violation[];
  } | null>(null);

  const [activeViolation, setActiveViolation] = useState<Violation | null>(null);

  // Proctoring hook
  const handleViolation = useCallback((violation: Violation) => {
    setActiveViolation(violation);
    
    // Send violation to backend (optional - non-blocking)
    if (testState.sessionId && !testState.sessionId.startsWith('local_')) {
      api.post(`/test/${testState.sessionId}/violation`, {
        type: violation.type,
        description: violation.description,
        severity: violation.severity
      }, { timeout: 3000 }).catch(() => {});
    }
  }, [testState.sessionId]);

  const handleTerminate = useCallback(async (_violations: Violation[]) => {
    setTestState(prev => ({ ...prev, status: 'terminated' }));
    if (timerRef.current) clearInterval(timerRef.current);
    if (sectionTimerRef.current) clearInterval(sectionTimerRef.current);
    
    // Smoothly exit fullscreen on termination
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error('Failed to exit fullscreen manually on termination:', e);
    }
    
    // Save terminated session (optional - non-blocking)
    if (testState.sessionId && !testState.sessionId.startsWith('local_')) {
      api.post(`/test/${testState.sessionId}/terminate`, {
        reason: 'Maximum violations exceeded'
      }, { timeout: 3000 }).catch(() => {});
    }
  }, [testState.sessionId]);

  const handleWarning = useCallback((_count: number) => {
    // Additional warning handling if needed
  }, []);

  const proctoring = useProctoring({
    onViolation: handleViolation,
    onTerminate: handleTerminate,
    onWarning: handleWarning,
  });

  // Cleanup proctoring on unmount
  useEffect(() => {
    return () => {
      // Stop all media streams when component unmounts
      proctoring.stopProctoring().catch(() => {});
    };
  }, []);

  // Stop proctoring when test is terminated
  useEffect(() => {
    if (testState.status === 'terminated' && !practiceMode) {
      proctoring.stopProctoring().catch(() => {});
    }
  }, [testState.status, practiceMode]);

  // Handle back button with cleanup
  const handleBack = async () => {
    // Stop proctoring if active
    if (!practiceMode && proctoring.state.isActive) {
      await proctoring.stopProctoring();
    }
    // Clear timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (sectionTimerRef.current) clearInterval(sectionTimerRef.current);
    onBack();
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert API question to local format
  const convertApiQuestion = (q: any): Question => {
    // Handle new AI format or legacy schema
    const isNewFormat = Array.isArray(q.options) && typeof q.options[0] === 'string';
    return {
      id: q.id || q._id,
      question: q.question || q.questionText,
      text: q.question || q.questionText, // For compatibility
      options: isNewFormat ? q.options : (q.options?.map((o: any) => o.text) || []),
      correct: isNewFormat ? (q.correct ?? 0) : (q.options?.findIndex((o: any) => o.isCorrect) ?? 0),
      explanation: q.explanation || '',
      difficulty: (q.difficulty || 'medium').toLowerCase() as 'easy' | 'medium' | 'hard' | 'advanced',
      weight: q.weight || 1,
      companyAskedIn: q.companyAskedIn || null,
      section: q.section || null,
    } as Question;
  };

  // Get icon for section
  const getSectionIcon = (sectionName: string): string => {
    const icons: Record<string, string> = {
      'DBMS': '🗄️', 'CN': '🌐', 'OOPS': '🔷', 'SQL': '📊',
      'Coding': '💻', 'DSA': '🌳', 'OS': '⚙️', 'Aptitude': '🧮',
      'Logical': '🧩', 'Verbal': '📝', 'SystemDesign': '🏗️',
      'WebDevelopment': '🌍', 'DevOps': '🚀', 'Security': '🔒',
      'ML': '🤖', 'Cloud': '☁️',
      // Full names
      'Operating Systems': '⚙️', 'Computer Networks': '🌐',
      'Data Structures': '🌳', 'System Design': '🏗️',
      'Technical Fundamentals': '💡', 'Data Structures & Algorithms': '🌳',
    };
    return icons[sectionName] || '📋';
  };

  const startTest = async (skipProctoring = false) => {
    try {
      console.log('[Assessment] startTest called', { skipProctoring, practiceMode });
      // Start proctoring only if not in practice/skip mode
      if (!skipProctoring && !practiceMode) {
        console.log('[Assessment] Attempting to start proctoring...');
        const proctoringStarted = await proctoring.startProctoring();
        console.log('[Assessment] proctoringStarted:', proctoringStarted);
        if (!proctoringStarted) {
          toast.error('Cannot start proctored test without permissions. Try Practice Mode instead.');
          console.error('[Assessment] Proctoring permissions denied or failed.');
          // Reset loading status so UI doesn't remain stuck
          setTestState(prev => ({ ...prev, status: 'setup' }));
          return;
        }
      } else {
        setPracticeMode(true);
        toast('Starting in Practice Mode - no proctoring');
        console.log('[Assessment] Practice mode enabled.');
        
        // Even in practice mode, forcibly enter fullscreen to maintain focus layout
        try {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
          }
        } catch (e) {
          console.error("Practice fullscreen failed:", e);
        }
      }

      // Set loading state
      setTestState(prev => ({ ...prev, status: 'loading' }));
      console.log('[Assessment] Set status to loading.');

      let sessionId = `local_${Date.now()}`;
      let testId: string | null = null;
      let isApiMode = false;
      let sections = testState.sections;

      // ─── Fetch AI-generated questions from the backend ────────────────
      try {
        const token = localStorage.getItem('prepzo-token');
        if (token) {
          const isFieldTest = testMode === 'field';
          const isSkillTest = testMode === 'skills';
          
          const aiTestConfig = {
            targetRole: user?.targetRole || 'Software Engineer',
            // Stage 1 (Field) expects ~60 questions. Stage 2 (Skill) expects 10 per skill.
            questionsPerSection: isFieldTest ? 10 : (isSkillTest ? 10 : 5), 
            testMode: testMode || 'combined',
            adaptive: true,
            enableProctoring: !skipProctoring,
            degree: user?.degree || testConfig.degree,
            fieldOfStudy: user?.fieldOfStudy,
            skillRatings: user?.skillRatings,
            // For skill test, pass the selected skills
            skills: user?.knownTechnologies || [],
          };
          
          let endpoint = '/ai-test/generate';
          if (isFieldTest) endpoint = '/ai-test/generate/field-test';
          else if (isSkillTest) endpoint = '/ai-test/generate/skill-test';

          console.log(`[Assessment] Calling ${endpoint}...`, aiTestConfig);
          toast.loading(
            isFieldTest 
              ? '🤖 Stage 1: Generating 60 core placement questions...' 
              : '🤖 Stage 2: Generating 10 questions per selected skill...', 
            { id: 'ai-gen' }
          );

          const resp = await api.post(
            endpoint,
            { ...aiTestConfig, testConfig: aiTestConfig }, // Send both for backward/forward compat
            { headers: { Authorization: `Bearer ${token}` }, timeout: 600000 }
          );

          toast.dismiss('ai-gen');

          // Backend wraps in: { success, data: { sessionId, testId, test: {...} } }
          const payload = resp.data?.data || resp.data;
          const aiTest  = payload?.test ?? payload;
          
          console.log('[Assessment] AI payload structure:', { 
            hasPayload: !!payload, 
            hasTest: !!aiTest, 
            isRecovery: payload?.sessionId?.startsWith('recovery_'),
            sections: aiTest?.sections?.map((s: any) => ({ name: s.name, qCount: s.questions?.length }))
          });

          // Check if this is a valid AI test OR a planned backend recovery payload
          const isRecovery = payload?.sessionId?.startsWith('recovery_');
          
          if (aiTest && Array.isArray(aiTest.sections) && aiTest.sections.length > 0) {
            sessionId = payload.sessionId || `ai_${aiTest.testId || Date.now()}`;
            testId    = aiTest.testId || null;
            isApiMode = true;

            // Map AI format -> local Section format
            sections = aiTest.sections.map((aiSec: any) => {
              const secName = aiSec.name || aiSec.section || 'General';
              const secId   = aiSec.id   || secName.toLowerCase().replace(/\s+/g, '_');
              const timeSec = aiSec.timeLimit ? Math.ceil(aiSec.timeLimit / 60) : 15;
              return {
                section: {
                  id:        secId,
                  name:      secName,
                  icon:      getSectionIcon(secName),
                  questions: [],
                  timeLimit: timeSec,
                } as Section,
                questions:       (aiSec.questions || []).map(convertApiQuestion),
                answers:         {},
                answersWithTime: [],
                completed:       false,
                timeSpent:       0,
              };
            });
            toast.success(`✅ ${aiTest.totalQuestions} unique AI questions generated!`);
          } else if (isRecovery) {
            // Backend explicitly returned a recovery payload — skip throw and use fallback
            console.log('[Assessment] Backend triggered recovery mode. Proceeding with local fallback.');
            toast.dismiss('ai-gen');
          } else {
            toast.dismiss('ai-gen');
            throw new Error('AI returned empty test — starting with practice bank');
          }
        }
      } catch (apiError: any) {
        toast.dismiss('ai-gen');
        const errMsg = apiError?.response?.data?.detail || apiError?.message || 'AI service unavailable';
        
        // Only show red error if it's not a handled empty-result case
        if (!errMsg.includes('empty test')) {
          console.error('[Assessment] AI generation failed:', errMsg);
          if (
            errMsg.toLowerCase().includes('ollama') ||
            errMsg.toLowerCase().includes('model not available') ||
            apiError?.response?.status === 503
          ) {
            toast.error('⚠️ AI model (Ollama) is not running. Please start Ollama then try again.', { duration: 8000 });
          } else {
            toast.error(`AI generation failed: ${String(errMsg).slice(0, 120)}`);
          }
        }
      }

      // ─── Fallback: inject comprehensive question bank if sections are still empty ─────
      console.log('[Assessment] Pre-fallback check:', { 
        isApiMode, 
        sectionCount: sections?.length,
        firstSectionQs: sections?.[0]?.questions?.length 
      });
      const noQuestions = !sections || sections.length === 0 ||
        sections.every((s: any) => !Array.isArray(s.questions) || s.questions.length === 0);
      if (noQuestions) {
        console.warn('[Assessment] No AI questions available — injecting fallback question bank (6 sections × 20 questions)');
        toast('⚠️ AI service unavailable. Starting with 120 practice questions across 6 sections.', { icon: 'ℹ️' });
        isApiMode = false;
        testId = null;
        sessionId = `local_${Date.now()}`;
        sections = FALLBACK_SECTIONS.map(fb => ({
          section: {
            id: fb.id,
            name: fb.name,
            icon: fb.icon,
            questions: [],
            timeLimit: fb.timeLimit,
          } as Section,
          questions: fb.questions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correct: q.correct,
            difficulty: q.difficulty,
            explanation: q.explanation,
          })),
          answers: {},
          answersWithTime: [],
          completed: false,
          timeSpent: 0,
        }));
      }

      // ─── Activate test ────────────────────────────────────────────────────
      const totalTimeSec = sections.reduce(
        (acc: number, s: any) => acc + (s.section?.timeLimit ?? 15) * 60,
        0
      );
      setTestState((prev: TestState) => ({
        ...prev,
        sections,
        status:        'active',
        sessionId,
        testId,
        isApiMode,
        totalTime:     isApiMode ? totalTimeSec : prev.totalTime,
        timeRemaining: isApiMode ? totalTimeSec : prev.timeRemaining,
      }));
      console.log('[Assessment] Test state set to active.');

      // Set section timer
      const currentSection = sections[0];
      setSectionTimeRemaining((currentSection.section?.timeLimit ?? 15) * 60);
      console.log('[Assessment] Section timer set.');

      toast.success('Test started! Good luck!');
    } catch (error) {
      console.error('[Assessment] Error starting test:', error);
      toast.error('Failed to start test. Please try again.');
      setTestState((prev: TestState) => ({ ...prev, status: 'setup' }));
    }
  };

  // Main timer effect
  useEffect(() => {
    if (testState.status !== 'active') return;

    timerRef.current = setInterval(() => {
      setTestState((prev: TestState) => {
        if (prev.timeRemaining <= 1) {
          // Auto-submit when time runs out
          clearInterval(timerRef.current!);
          submitTest();
          return { ...prev, timeRemaining: 0, status: 'completed' };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState.status]);

  // Section timer effect
  useEffect(() => {
    if (testState.status !== 'active') return;

    sectionTimerRef.current = setInterval(() => {
      setSectionTimeRemaining((prev: number) => {
        if (prev <= 1) {
          // Auto-move to next section
          handleNextSection(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (sectionTimerRef.current) clearInterval(sectionTimerRef.current);
    };
  }, [testState.status, testState.currentSectionIndex]);

  // Set video element for proctoring
  useEffect(() => {
    if (videoRef.current) {
      proctoring.setVideoElement(videoRef.current);
    }
    if (canvasRef.current) {
      proctoring.setCanvasElement(canvasRef.current);
    }
  }, [testState.status]);

  // Track question start time for time tracking
  const questionStartTimeRef = useRef<number>(Date.now());

  // Reset question start time when question changes
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [testState.currentQuestionIndex, testState.currentSectionIndex]);

  // Handle answer selection
  const handleAnswer = (questionId: string, optionIndex: number) => {
    const timeSpent = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    setTestState((prev: TestState) => {
      const newSections = [...prev.sections];
      newSections[prev.currentSectionIndex].answers[questionId] = optionIndex;
      // Update or add answer with time for API submission
      const existingIdx = newSections[prev.currentSectionIndex].answersWithTime
        .findIndex((a: SubmitAnswer) => a.questionId === questionId);
      if (existingIdx >= 0) {
        newSections[prev.currentSectionIndex].answersWithTime[existingIdx] = {
          questionId,
          selectedOption: optionIndex,
          timeSpent: timeSpent + newSections[prev.currentSectionIndex].answersWithTime[existingIdx].timeSpent,
        };
      } else {
        newSections[prev.currentSectionIndex].answersWithTime.push({
          questionId,
          selectedOption: optionIndex,
          timeSpent,
        });
      }
      return { ...prev, sections: newSections };
    });
    // Reset timer for this question in case they change their answer
    questionStartTimeRef.current = Date.now();
  };

  // Navigate questions
  const handleNextQuestion = () => {
    const currentSection = testState.sections[testState.currentSectionIndex];
    if (testState.currentQuestionIndex < currentSection.questions.length - 1) {
      setTestState((prev: TestState) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    }
  };

  const handlePrevQuestion = () => {
    if (testState.currentQuestionIndex > 0) {
      setTestState((prev: TestState) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    }
  };

  // Handle section navigation
  const handleNextSection = (autoSubmit = false) => {
    if (testState.currentSectionIndex < testState.sections.length - 1) {
      // Mark current section as completed
      setTestState((prev: TestState) => {
        const newSections = [...prev.sections];
        newSections[prev.currentSectionIndex].completed = true;
        newSections[prev.currentSectionIndex].timeSpent = 
          prev.sections[prev.currentSectionIndex].section.timeLimit * 60 - sectionTimeRemaining;
        const nextSection = newSections[prev.currentSectionIndex + 1];
        setSectionTimeRemaining(nextSection.section.timeLimit * 60);
        return {
          ...prev,
          sections: newSections,
          currentSectionIndex: prev.currentSectionIndex + 1,
          currentQuestionIndex: 0,
        };
      });
      if (autoSubmit) {
        toast('Section time ended. Moving to next section.');
      }
    } else {
      // Last section - submit test
      submitTest();
    }
  };

  // Submit test
  const submitTest = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (sectionTimerRef.current) clearInterval(sectionTimerRef.current);

    // Calculate results with attempted/unattempted tracking
    let totalQuestions = 0;
    let correctAnswers = 0;
    let attemptedQuestions = 0;
    // let totalTimeSpent = testState.totalTime - testState.timeRemaining;
    
    const sectionResults = testState.sections.map(sec => {
      let sectionCorrect = 0;
      let sectionAttempted = 0;
      
      sec.questions.forEach(q => {
        totalQuestions++;
        const wasAttempted = sec.answers[q.id] !== undefined;
        
        if (wasAttempted) {
          attemptedQuestions++;
          sectionAttempted++;
          if (sec.answers[q.id] === q.correct) {
            correctAnswers++;
            sectionCorrect++;
          }
        }
      });
      
      // Calculate accuracy rate (correct out of attempted)
      const accuracyRate = sectionAttempted > 0 ? Math.round((sectionCorrect / sectionAttempted) * 100) : 0;
      
      return {
        name: sec.section.name,
        total: sec.questions.length,
        correct: sectionCorrect,
        attempted: sectionAttempted,
        unattempted: sec.questions.length - sectionAttempted,
        score: Math.round((sectionCorrect / sec.questions.length) * 100),
        accuracyRate,
      };
    });

    const unattemptedQuestions = totalQuestions - attemptedQuestions;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const accuracyRate = attemptedQuestions > 0 ? Math.round((correctAnswers / attemptedQuestions) * 100) : 0;
    
    // Build TestAnalysisResult for AI engine
    const analysis: TestAnalysisResult = {
      sections: sectionResults.map(s => ({
        name: s.name,
        totalQuestions: s.total,
        attemptedQuestions: s.attempted,
        correctAnswers: s.correct,
        accuracyRate: s.accuracyRate,
        score: s.score,
      })),
      totalQuestions,
      attemptedQuestions,
      correctAnswers,
      accuracyRate,
      completionRate: totalQuestions > 0 ? Math.round((attemptedQuestions / totalQuestions) * 100) : 0,
      overallScore: score,
      criticalWeaknesses: sectionResults.filter(s => s.score < 50).map(s => s.name),
      questionDetails: testState.sections.flatMap(sec => sec.questions.map(q => ({
        questionId: q.id,
        section: sec.section.name,
        questionText: q.question,
        options: q.options,
        correctAnswer: q.correct,
        userAnswer: sec.answers[q.id] ?? null,
        wasAttempted: sec.answers[q.id] !== undefined,
        wasCorrect: sec.answers[q.id] === q.correct,
        difficulty: q.difficulty || 'medium',
        explanation: q.explanation || '',
        skillTags: q.skillTags || [],
        timeSpent: (sec.answersWithTime.find(a => a.questionId === q.id)?.timeSpent) || 0,
        companyAskedIn: q.companyAskedIn || '',
      }))),
    };
    setTestAnalysis(analysis);

    // Always fetch AI recommendations after assessment, no threshold or blocking
    // Fetch ONLY real backend AI recommendations (no fallback, no local)
    try {
      const { generateRecommendations } = await import('@/api/recommendations');
      // Build clean payload, prevent NaN/undefined
      const backendRecs = await generateRecommendations(
        {
          totalQuestions: analysis.totalQuestions || 0,
          attemptedQuestions: analysis.attemptedQuestions || 0,
          correctAnswers: analysis.correctAnswers || 0,
          accuracyRate: analysis.accuracyRate || 0,
          overallScore: analysis.overallScore || 0,
          sections: (analysis.sections || []).map((s: any) => ({
            name: s.name || 'Unknown',
            totalQuestions: s.totalQuestions || 0,
            attemptedQuestions: s.attemptedQuestions || 0,
            correctAnswers: s.correctAnswers || 0,
            score: s.totalQuestions > 0 ? Math.round((s.correctAnswers / s.totalQuestions) * 100) : 0
          })),
          questionDetails: analysis.questionDetails || []
        },
        user?.targetRole || 'Software Engineer',
        {
          name: user?.fullName || '',
          dreamCompanies: user?.preferredCompanies || [],
          knownTechnologies: user?.knownTechnologies || []
        }
      );
      console.log('✅ Backend real AI recommendations loaded:', backendRecs);
      localStorage.setItem('backendRecommendations', JSON.stringify(backendRecs));
      localStorage.setItem('testAnalysis', JSON.stringify(analysis));
      toast.success('✅ Real AI recommendations generated from your test results!');
    } catch (backendErr) {
      console.error('Backend AI failed:', backendErr);
      toast.error('Backend AI temporarily unavailable');
    }

    // Calculate strengths and weaknesses based on section performance
    const sortedSections = [...sectionResults].sort((a, b) => b.score - a.score);
    const strengths = sortedSections
      .filter(s => s.score >= 60)
      .slice(0, 3)
      .map(s => s.name);
    const weaknesses = sortedSections
      .filter(s => s.score < 60)
      .slice(-3)
      .map(s => s.name);
    
    // Create skill ratings from section scores
    const skillRatings: Record<string, number> = {};
    sectionResults.forEach(s => {
      skillRatings[s.name] = s.score;
    });

    // Identify skill gaps (sections below 50%)
    const skillGaps = sectionResults
      .filter(s => s.score < 50)
      .map(s => s.name);

    setResults({
      totalQuestions,
      correctAnswers,
      attemptedQuestions,
      unattemptedQuestions,
      accuracyRate,
      score,
      sectionResults,
      violations: proctoring.state.violations,
    });

    // Submit to intelligent question API if in API mode
    if (testState.isApiMode && testState.testId) {
      try {
        const allAnswers: SubmitAnswer[] = testState.sections.flatMap(sec => sec.answersWithTime);
        const totalTimeSpent = testState.totalTime - testState.timeRemaining;

        const apiResult = await questionApi.submitTest({
          testId: testState.testId,
          answers: allAnswers,
          totalTimeSpent,
        });

        console.log('Test submitted to intelligent engine:', apiResult);
        
        // Use API recommendations if available
        if (apiResult.recommendations?.length > 0) {
          toast.success(`Recommendations: ${apiResult.recommendations.slice(0, 2).join(', ')}`);
        }
      } catch (apiError) {
        console.log('Could not submit to question API:', apiError);
      }
    }

    // Save to backend with complete question details for answer review
    try {
      const token = localStorage.getItem('token');
      if (testState.sessionId && !testState.sessionId.startsWith('local_') && token) {
        // Prepare question details for backend storage
        const questionDetails: Record<string, Array<{
          questionId: string;
          questionText: string;
          options: string[];
          correctAnswer: number;
          selectedAnswer: number;
          isCorrect: boolean;
          isAttempted: boolean;
          difficulty: string;
          explanation: string;
        }>> = {};
        
        testState.sections.forEach((sec) => {
          questionDetails[sec.section.id] = sec.questions.map(q => ({
            questionId: q.id,
            questionText: q.question,
            options: q.options,
            correctAnswer: q.correct,
            selectedAnswer: sec.answers[q.id] ?? -1,
            isCorrect: sec.answers[q.id] === q.correct,
            isAttempted: sec.answers[q.id] !== undefined,
            difficulty: q.difficulty || 'medium',
            explanation: q.explanation || '',
          }));
        });
        
        await api.post(`/test/${testState.sessionId}/complete`, {
          sections: sectionResults.map((sr, idx) => ({
            sectionId: testState.sections[idx].section.id,
            sectionName: sr.name,
            questionsAttempted: sr.attempted,
            correctAnswers: sr.correct,
            score: sr.score,
            answers: testState.sections[idx].questions.map(q => ({
              questionId: q.id,
              selectedOption: testState.sections[idx].answers[q.id] ?? -1,
              isCorrect: testState.sections[idx].answers[q.id] === q.correct,
              correctAnswer: q.correct,
              questionText: q.question,
              options: q.options,
              explanation: q.explanation || '',
              difficulty: q.difficulty || 'medium',
            }))
          })),
          questionDetails
        }, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000
        });
      }
    } catch {
      console.log('Could not save to backend, results stored locally');
    }

    // Stop proctoring
    if (!practiceMode) {
      await proctoring.stopProctoring();
    }

    // Force exit fullscreen after test completion (applies to both practice and proctored modes)
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error('Failed to exit fullscreen manually after test completion:', e);
    }

    // Update user with all test results data
    updateUser({ 
      placementReadinessScore: Math.max(user?.placementReadinessScore || 0, score),
      strengths: strengths.length > 0 ? strengths : user?.strengths || [],
      weaknesses: weaknesses.length > 0 ? weaknesses : user?.weaknesses || [],
      skillGaps: skillGaps.length > 0 ? skillGaps : user?.skillGaps || [],
      skillRatings: { ...(user?.skillRatings || {}), ...skillRatings },
      testResults: {
        totalQuestions,
        correctAnswers,
        score,
        sectionResults,
        takenAt: new Date().toISOString(),
      },
      skillsMatchedScore: score,
    });

    setTestState(prev => ({ ...prev, status: 'completed' }));
    setShowResults(true);
    
    onComplete(score);
  };

  // --- Unified Layout System ---
  const renderAssessmentContent = () => {
    // Current section and question
    const currentSection = testState.sections[testState.currentSectionIndex];
    const currentQuestion = currentSection?.questions[testState.currentQuestionIndex];

  if (testState.status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] selection:bg-white selection:text-black">
        <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[40px] p-20 border border-white/5 overflow-hidden text-center max-w-lg w-full flex flex-col items-center">
          <ThinkingLoader 
            loadingText="Compiling Assessment Results" 
          />
          <p className="text-[14px]  font-medium text-white/40 italic mt-6">Assembling a high-fidelity assessment from the core intelligence engine.</p>
        </div>
      </div>
    );
  }

  // Render setup/instructions
  if (testState.status === 'setup' && showInstructions) {
    return (
      <div className="space-y-10 selection:bg-white selection:text-black">
        <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-white/5 overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8 md:mb-12 text-center md:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-white/40" />
            </div>
            <div>
              <p className="text-[10px] md:text-[11px]  font-[900] uppercase tracking-[0.4em] text-white/20 mb-2">Diagnostic Unit</p>
              <h2 className="text-3xl md:text-4xl  font-[900] text-white uppercase tracking-tighter italic leading-none">Career Readiness Signal</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/5 border border-white/5">
              <p className="text-[10px]  font-black text-white/20 uppercase tracking-[0.2em] mb-4 text-center">Protocol Domain</p>
              <p className="text-xl md:text-2xl  font-[900] text-white text-center uppercase italic tracking-tighter">{testConfig.field}</p>
            </div>
            <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/5 border border-white/5 shadow-[0_0_40px_rgba(255,255,255,0.02)]">
              <p className="text-[10px]  font-black text-white/20 uppercase tracking-[0.2em] mb-4 text-center">Target Role</p>
              <p className="text-xl md:text-2xl  font-[900] text-white text-center uppercase italic tracking-tighter">{testConfig.targetRole}</p>
            </div>
            <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/5 border border-white/5">
              <p className="text-[10px]  font-black text-white/20 uppercase tracking-[0.2em] mb-4 text-center">Duration</p>
              <p className="text-xl md:text-2xl  font-[900] text-white text-center uppercase italic tracking-tighter">{testConfig.totalTime} MIN</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <p className="text-[11px]  font-[900] uppercase tracking-[0.4em] text-white/20">Operational Modules ({testConfig.sections.length})</p>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testConfig.sections.map((section) => (
                <div key={section.id} className="flex items-center gap-4 p-4 md:p-5 rounded-[20px] md:rounded-[24px] bg-white/5 border border-white/5 hover:border-white/10 transition-colors group/sec">
                  <span className="text-xl md:text-2xl opacity-40 grayscale group-hover/sec:grayscale-0 transition-all">{section.icon}</span>
                  <div>
                    <p className="text-[12px] md:text-[13px]  font-black text-white/60 uppercase italic tracking-widest leading-tight">{section.name}</p>
                    <p className="text-[9px] md:text-[10px]  font-bold text-white/20 uppercase tracking-[0.1em] mt-1">{testConfig.questionsPerSection} SIGNALS • {section.timeLimit} MIN</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-white/5 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-4">
            <h3 className="text-xl md:text-2xl  font-[900] text-white uppercase tracking-tighter italic flex items-center gap-4">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-white/10" /> Proctoring Integrity
            </h3>
            <p className="text-[9px] md:text-[10px]  font-black text-white/20 uppercase tracking-[0.4em]">Active Protocol Required</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { icon: Camera, title: 'Visual ID Verification', desc: 'Continuous face mesh analysis', color: 'text-blue-400' },
              { icon: Mic, title: 'Audio Fingerprinting', desc: 'Atmospheric noise monitoring', color: 'text-green-400' },
              { icon: Monitor, title: 'Terminal Guard', desc: 'Secure environment restriction', color: 'text-purple-400' },
              { icon: Maximize, title: 'Absolute Display', desc: 'Forced focal alignment', color: 'text-orange-400' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-5 p-5 md:p-6 rounded-[24px] md:rounded-[28px] bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                <item.icon className={`w-6 h-6 md:w-8 md:h-8 ${item.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                <div>
                  <p className="text-[13px] md:text-[14px]  font-black text-white uppercase tracking-widest italic">{item.title}</p>
                  <p className="text-[9px] md:text-[10px]  font-bold text-white/20 uppercase tracking-[0.1em]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[32px] bg-red-500/5 border border-red-500/10 mb-12">
            <div className="flex items-start gap-6">
              <AlertTriangle className="w-10 h-10 text-red-500/40 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[16px]  font-black text-red-500 uppercase tracking-widest italic mb-2">Zero Tolerance Policy</p>
                <p className="text-[14px]  font-medium text-white/40 italic leading-relaxed">
                  System monitors all environmental signals. Three deviations will trigger automatic terminal termination. 
                  <span className="text-white/60"> Ensure all external hardware is configured.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
            <motion.button 
              whileHover={{ x: -10 }}
              onClick={onBack}
              className="order-2 md:order-1 group flex items-center gap-3 text-[10px] md:text-[11px]  font-black text-white/20 hover:text-white uppercase tracking-[0.4em] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Go Back
            </motion.button>
            <button 
              onClick={() => setShowInstructions(false)}
              className="order-1 md:order-2 w-full md:w-auto bg-white text-[#161a20] px-8 md:px-10 py-4 md:py-5 rounded-[20px] md:rounded-[24px]  font-black uppercase tracking-[0.15em] md:tracking-[0.2em] italic text-[13px] md:text-[14px] hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              Initialize Diagnostic
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render permission request
  if (testState.status === 'setup' && !showInstructions) {
    return (
      <div className="space-y-10 selection:bg-white selection:text-black">
        <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-white/5 overflow-hidden">
          <div className="text-center py-8 md:py-12">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 md:mb-10 rounded-[28px] md:rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center group">
              <Shield className="w-10 h-10 md:w-12 md:h-12 text-white/40 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-[10px] md:text-[11px]  font-[900] uppercase tracking-[0.5em] text-white/20 mb-4">Integrity Verification</p>
            <h2 className="text-3xl md:text-4xl  font-[900] text-white uppercase tracking-tighter italic mb-4 leading-none">Signal Authentication Required</h2>
            <p className="text-[14px] md:text-[16px]  font-medium text-white/40 max-w-lg mx-auto leading-relaxed italic mb-8 md:mb-12">
              System initialization requires active sensory permissions. All diagnostic data is processed locally to ensure privacy.
            </p>
            
            <div className="flex items-center justify-center gap-10 mb-16">
              {[
                { icon: Camera, label: 'Visual' },
                { icon: Mic, label: 'Audio' },
                { icon: Monitor, label: 'Stream' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 rounded-[22px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <item.icon className="w-7 h-7 text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>
                  <span className="text-[10px]  font-black text-white/20 uppercase tracking-[0.2em]">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="flex justify-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowInstructions(true)}
                  className="px-8 py-5 rounded-[22px] border border-white/10 text-[12px]  font-black text-white/40 uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  Return to Manual
                </motion.button>
                <button 
                  onClick={() => startTest(false)}
                  className="bg-white text-[#161a20] px-12 py-5 rounded-[24px]  font-black uppercase tracking-[0.2em] italic text-[14px] hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                >
                  <Play className="w-5 h-5" /> Start Proctored Test
                </button>
              </div>
              <div className="w-full h-[1px] bg-white/5 max-w-sm" />
              <div className="text-center">
                <p className="text-[10px]  font-black text-white/20 uppercase tracking-[0.3em] mb-4 italic">Bypass Integrity Protocol:</p>
                <button 
                  onClick={() => startTest(true)}
                  className="group flex items-center gap-3 text-[12px]  font-black text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors mx-auto"
                >
                  <BookOpen className="w-4 h-4 opacity-40 group-hover:opacity-100" /> Start in Practice Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render terminated state
  if (testState.status === 'terminated') {
    return (
      <div className="space-y-10 selection:bg-white selection:text-black">
        <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-red-500/10 overflow-hidden text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 md:mb-10 rounded-[24px] md:rounded-[32px] bg-red-500/5 border border-red-500/10 flex items-center justify-center">
            <XCircle className="w-10 h-10 md:w-12 md:h-12 text-red-500/40" />
          </div>
          <p className="text-[10px] md:text-[11px]  font-[900] uppercase tracking-[0.5em] text-red-500/40 mb-4">Protocol Terminated</p>
          <h2 className="text-4xl md:text-5xl  font-[900] text-white uppercase tracking-tighter italic mb-6 leading-none">Integrity Failure</h2>
          <p className="text-[14px] md:text-[16px]  font-medium text-white/40 max-w-lg mx-auto leading-relaxed italic mb-8 md:mb-12">
            The assessment session has been forcefully closed due to repeated integrity deviations. Standard diagnostic protocols were not maintained.
          </p>
          
          <div className="max-w-md mx-auto mb-12 space-y-3">
            {proctoring.state.violations.map((v, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-[24px] bg-red-500/5 border border-red-500/10 text-left group">
                <AlertTriangle className="w-5 h-5 text-red-500/30 group-hover:text-red-500 transition-colors" />
                <span className="text-[13px]  font-medium text-red-400/80 italic">{v.description}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={handleBack}
            className="px-10 py-5 rounded-[22px] border border-white/10 text-[12px]  font-black text-white/40 uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  // Render results
  if (testState.status === 'completed' && showResults && results) {
    return (
      <div className="space-y-12 selection:bg-white selection:text-black">
        {showAnswerReview && testAnalysis && (
          <AnswerReviewPanel
            questionDetails={testAnalysis.questionDetails}
            sections={testAnalysis.sections}
            onClose={() => setShowAnswerReview(false)}
          />
        )}
        
        <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-white/5 overflow-hidden text-center group">
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-32 h-32 md:w-48 md:h-48 mb-8 md:mb-10"
            >
              <div className="absolute inset-0 rounded-full border-[8px] md:border-[12px] border-white/5" />
              <div className="absolute inset-0 rounded-full border-[8px] md:border-[12px] border-white shadow-[0_0_50px_rgba(255,255,255,0.1)]" style={{ clipPath: `inset(0 0 ${100 - results.score}% 0)` }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl md:text-6xl  font-[900] text-white italic tracking-tighter">{results.score}%</span>
                <span className="text-[8px] md:text-[10px]  font-black text-white/20 uppercase tracking-[0.2em] mt-1">Market Match</span>
              </div>
            </motion.div>
            
            <p className="text-[10px] md:text-[11px]  font-[900] uppercase tracking-[0.5em] text-white/20 mb-4">Diagnostic Signal Captured</p>
            <h2 className="text-3xl md:text-5xl  font-[900] text-white uppercase tracking-tighter italic mb-8 md:mb-10 leading-none">Assessment Decoded</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
              {[
                { label: 'Signals Captured', val: `${results.attemptedQuestions}/${results.totalQuestions}`, color: 'text-white/60' },
                { label: 'Truth Vector', val: results.correctAnswers, color: 'text-white' },
                { label: 'Gap Radius', val: results.unattemptedQuestions, color: 'text-white/40' },
                { label: 'Precision Rate', val: `${results.accuracyRate}%`, color: 'text-white' }
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/5">
                  <p className="text-[10px]  font-black text-white/20 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                  <p className={`text-2xl  font-[900] italic tracking-tighter ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[40px] p-12 border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl  font-[900] text-white uppercase tracking-tighter italic flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-white/10" /> Segment Analysis
            </h3>
            <button 
              onClick={() => setShowAnswerReview(true)}
              className="px-6 py-3 rounded-[18px] border border-white/10 text-[11px]  font-black text-white/40 uppercase tracking-widest hover:bg-white/5 transition-all italic"
            >
              Review Signal Matrix
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {results.sectionResults.map((section, idx) => (
              <div key={idx} className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <span className="text-[12px] md:text-[13px]  font-black text-white/60 uppercase italic tracking-widest leading-tight">{section.name}</span>
                  <span className="text-lg md:text-xl  font-[900] text-white italic tracking-tighter">{section.score}%</span>
                </div>
                <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden mb-4 md:mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${section.score}%` }}
                    transition={{ delay: idx * 0.1 }}
                    className="h-full bg-white opacity-40"
                  />
                </div>
                <div className="flex justify-between text-[10px]  font-black text-white/20 uppercase tracking-widest">
                  <span>{section.correct} PASS</span>
                  <span>{section.attempted} TRIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[40px] p-10 border border-white/5">
            <h3 className="text-xl  font-[900] text-white uppercase tracking-widest italic flex items-center gap-4 mb-8">
              <TrendingUp className="w-6 h-6 text-white/20" /> Active Strengths
            </h3>
            <div className="space-y-4">
              {results.sectionResults.filter(s => s.score >= 60).slice(0, 4).map((section, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 rounded-[24px] bg-white/5 border border-white/5">
                  <span className="text-[14px]  font-black text-white/60 uppercase italic tracking-widest">{section.name}</span>
                  <span className="text-lg  font-[900] text-white italic">+{section.score}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[40px] p-10 border border-white/5">
            <h3 className="text-xl  font-[900] text-white uppercase tracking-widest italic flex items-center gap-4 mb-8">
              <TrendingDown className="w-6 h-6 text-white/20" /> Signal Gaps
            </h3>
            <div className="space-y-4">
              {results.sectionResults.filter(s => s.score < 60).slice(0, 4).map((section, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 rounded-[24px] bg-white/5 border border-red-500/10">
                  <span className="text-[14px]  font-black text-red-500/60 uppercase italic tracking-widest">{section.name}</span>
                  <span className="text-lg  font-[900] text-red-500 italic">{section.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 pt-10">
          <button 
            onClick={handleBack}
            className="px-10 py-5 rounded-[22px] border border-white/10 text-[12px]  font-black text-white/40 uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Re-Initialize Diagnostic
          </button>
          <button 
            onClick={() => onComplete(results.score)}
            className="bg-white text-[#161a20] px-12 py-5 rounded-[24px]  font-black uppercase tracking-[0.2em] italic text-[14px] hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          >
            Access career dashboard <Award className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Render active test
  if (testState.status === 'active' && currentSection && currentQuestion) {
    return (
      <>
        {/* Full-Screen Blocking Warning Modal for Anti-Cheating */}
        {activeViolation && (
          <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#161a20]/95 backdrop-blur-xl p-8 selection:bg-white selection:text-black">
            <div className="bg-[#161a20] border border-red-500/30 rounded-[40px] p-12 max-w-xl text-center shadow-[0_0_100px_rgba(239,68,68,0.1)]">
               <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-8 animate-pulse opacity-40" />
               <p className="text-[11px]  font-[900] uppercase tracking-[0.5em] text-red-500/40 mb-2">Protocol Warning</p>
               <h2 className="text-4xl  font-[900] text-white uppercase tracking-tighter italic mb-6 leading-none">Integrity Violation</h2>
               <p className="text-[15px]  font-medium text-red-400 mb-8 italic px-6 py-4 bg-red-500/5 rounded-[24px] border border-red-500/10">
                 {activeViolation.description}
               </p>
               <p className="text-[14px]  font-medium text-white/40 mb-10 leading-relaxed italic">
                 Deviation detected in environmental sensors. Repeated signals will result in automatic session termination.
               </p>
               <button 
                  onClick={() => {
                     setActiveViolation(null);
                     if (!document.fullscreenElement) {
                       document.documentElement.requestFullscreen().catch(() => {});
                     }
                  }}
                  className="w-full bg-white text-[#161a20]  font-black py-6 rounded-[24px] text-[16px] uppercase tracking-[0.2em] italic transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
               >
                 Acknowledge & Continue
               </button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
        {/* Proctoring video preview - only show when proctoring is active */}
        {!practiceMode && (
          <>
            <video 
              ref={videoRef} 
              muted 
              playsInline
              className="fixed bottom-4 right-4 w-32 h-24 rounded-xl object-cover z-50 border-2 border-white/20"
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}

        {/* Practice mode indicator */}
        {practiceMode && (
          <div className="fixed bottom-4 right-4 px-3 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30 z-50">
            <span className="text-yellow-400 text-sm font-medium">📝 Practice Mode</span>
          </div>
        )}

        {/* Top bar with timer and warnings */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 md:p-6 rounded-[24px] md:rounded-[32px] bg-[#161a20]/80 backdrop-blur-3xl border border-white/5 sticky top-2 md:top-4 z-40 shadow-[0_20px_50px_rgba(0,0,0,0.3)] gap-4 md:gap-8">
          <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-white/5 rounded-[14px] md:rounded-[18px]">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-white/40" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[9px]  font-black text-white/20 uppercase tracking-[0.2em] italic">Session Clock</span>
                <span className=" font-[900] text-xl md:text-3xl text-white tracking-tighter italic leading-none">{formatTime(testState.timeRemaining)}</span>
              </div>
            </div>
            <div className="hidden md:block h-10 w-[1px] bg-white/5" />
            <div className="flex flex-col text-right md:text-left">
                <span className="text-[8px] md:text-[9px]  font-black text-white/20 uppercase tracking-[0.2em] italic">Active Module</span>
                <span className="text-white text-[12px] md:text-[16px]  font-black uppercase italic tracking-widest leading-none">{currentSection.section.name}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8">
            <div className="flex flex-col">
                <span className="text-[8px] md:text-[9px]  font-black text-white/20 uppercase tracking-[0.2em] italic">Module Expiry</span>
                <span className={` font-black text-[14px] md:text-[18px] italic tracking-widest ${sectionTimeRemaining < 60 ? 'text-red-400' : 'text-white/60'}`}>
                  {formatTime(sectionTimeRemaining)}
                </span>
            </div>
            {!practiceMode && (
              <div className="flex items-center gap-4 md:gap-6 pl-4 md:pl-8 border-l border-white/5">
                {proctoring.state.warningCount > 0 && (
                  <div className="flex flex-col items-center">
                     <span className="text-[8px] md:text-[9px]  font-black text-red-500/40 uppercase mb-1">Alerts</span>
                     <span className="text-[12px] md:text-[14px]  font-black text-red-500 uppercase italic">{proctoring.state.warningCount}/3</span>
                  </div>
                )}
                <div className="flex gap-1.5 md:gap-2">
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)] ${proctoring.state.cameraEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)] ${proctoring.state.microphoneEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section progress */}
        <div className="flex gap-2 px-2">
          {testState.sections.map((sec, idx) => (
            <div 
              key={sec.section.id}
              className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                idx < testState.currentSectionIndex ? 'bg-white/40' :
                idx === testState.currentSectionIndex ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' :
                'bg-white/5'
              }`}
            />
          ))}
        </div>

        {/* Question card */}
        <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-white/5 overflow-hidden group">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-2xl md:text-3xl grayscale group-hover:grayscale-0 transition-all">{currentSection.section.icon}</span>
              <div className="flex flex-col">
                 <span className="text-[8px] md:text-[9px]  font-black text-white/20 uppercase tracking-[0.3em] italic">Current Segment</span>
                 <span className="text-[12px] md:text-[14px]  font-black text-white uppercase italic tracking-widest">{currentSection.section.name}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[8px] md:text-[9px]  font-black text-white/20 uppercase tracking-[0.3em] italic">Signal Pointer</span>
              <p className="text-[12px] md:text-[14px]  font-black text-white uppercase">Q {testState.currentQuestionIndex + 1} <span className="text-white/20">/ {currentSection.questions.length}</span></p>
            </div>
          </div>

          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mb-8 md:mb-12">
            <motion.div 
              className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: `${((testState.currentQuestionIndex + 1) / currentSection.questions.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>

          {/* Question context badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            {currentQuestion.companyAskedIn && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Target size={14} className="text-white/40" />
                <span className="text-[10px]  font-black text-white/60 uppercase tracking-widest italic">
                  Asked at {currentQuestion.companyAskedIn}
                </span>
              </div>
            )}
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Award size={14} className="text-white/40" />
                <span className="text-[10px]  font-black text-white/60 uppercase tracking-widest italic">
                  Grade: {currentQuestion.difficulty}
                </span>
              </div>
          </div>

          <h3 className="text-xl md:text-3xl  font-black text-white uppercase tracking-tight leading-tight mb-8 md:mb-12 italic">
            {currentQuestion.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion.id, idx)}
                className={`group/opt relative p-4 md:p-6 rounded-[20px] md:rounded-[24px] text-left transition-all duration-300 transform active:scale-[0.98] border ${
                  currentSection.answers[currentQuestion.id] === idx
                    ? 'bg-white border-white'
                    : 'bg-white/5 border-white/5 h-full hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-4 md:gap-5">
                  <span className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-[12px] md:rounded-[14px] text-[12px] md:text-[14px]  font-[900] transition-colors ${
                    currentSection.answers[currentQuestion.id] === idx
                      ? 'bg-[#161a20] text-white'
                      : 'bg-white/5 text-white/20 group-hover/opt:text-white/60'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-[13px] md:text-[15px]  font-medium italic ${
                    currentSection.answers[currentQuestion.id] === idx ? 'text-[#161a20]' : 'text-white/60 group-hover/opt:text-white'
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Question navigation grid */}
          <div className="flex flex-wrap gap-2 mb-8 md:mb-12 p-4 md:p-5 rounded-[24px] md:rounded-[28px] bg-white/5 border border-white/5 max-h-[140px] md:max-h-none overflow-y-auto">
            {currentSection.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setTestState(prev => ({ ...prev, currentQuestionIndex: idx }))}
                className={`w-9 h-9 md:w-11 md:h-11 rounded-[12px] md:rounded-[14px] text-[10px] md:text-[12px]  font-black transition-all duration-300 border ${
                  idx === testState.currentQuestionIndex
                    ? 'bg-white text-[#161a20] border-white scale-110 shadow-[0_10px_25px_rgba(255,255,255,0.2)]'
                    : currentSection.answers[q.id] !== undefined
                    ? 'bg-white/20 text-white border-white/20'
                    : 'bg-white/5 text-white/10 border-transparent hover:border-white/10'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-10 border-t border-white/5 gap-6">
            <button
               onClick={handlePrevQuestion}
               disabled={testState.currentQuestionIndex === 0}
               className="order-2 md:order-1 flex items-center gap-3 text-[10px] md:text-[11px]  font-black text-white/20 hover:text-white uppercase tracking-[0.4em] transition-colors disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" /> Previous Alpha
            </button>

            <button 
              onClick={() => {
                if (testState.currentQuestionIndex === currentSection.questions.length - 1) {
                  handleNextSection();
                } else {
                  handleNextQuestion();
                }
              }}
              className="order-1 md:order-2 w-full md:w-auto bg-white text-[#161a20] px-8 md:px-12 py-4 md:py-5 rounded-[18px] md:rounded-[22px]  font-black uppercase tracking-[0.1em] md:tracking-[0.2em] italic text-[13px] md:text-[14px] hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              {testState.currentQuestionIndex === currentSection.questions.length - 1 ? (
                testState.currentSectionIndex === testState.sections.length - 1 ? (
                  <>Finalize Protocol <CheckCircle className="w-5 h-5" /></>
                ) : (
                  <>Next Diagnostic <ChevronRight className="w-5 h-5" /></>
                )
              ) : (
                <>Next Signal <ChevronRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>

        {/* Section info */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/5 border border-white/5 gap-4">
          <p className="text-[10px] md:text-[12px]  font-black text-white/20 uppercase tracking-[0.2em] italic text-center md:text-left">
            <span className="text-white">
              {Object.keys(currentSection.answers).length}
            </span>
            /{currentSection.questions.length} Signals Captured in current module
          </p>
          <p className="text-[10px] md:text-[12px]  font-black text-white/20 uppercase tracking-[0.2em] italic">
            Operational Unit {testState.currentSectionIndex + 1} <span className="text-white/10">/ {testState.sections.length}</span>
          </p>
        </div>
      </div>
      </>
    );
  }

  // Fallback for any unhandled status
  return (
    <div className="space-y-6 flex flex-col items-center justify-center min-h-[60vh] selection:bg-white selection:text-black">
      <div className="relative bg-[#161a20]/60 backdrop-blur-3xl rounded-[40px] p-20 border border-white/5 overflow-hidden text-center max-w-lg w-full">
        <div className="w-24 h-24 mx-auto mb-10 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full animate-pulse opacity-20" />
        </div>
        <p className="text-[11px]  font-[900] uppercase tracking-[0.6em] text-white/20 mb-4">System Protocol</p>
        <h2 className="text-3xl  font-[900] text-white uppercase tracking-tighter italic mb-4">Initializing Diagnostic</h2>
        <p className="text-[14px]  font-medium text-white/40 italic">Please wait while the diagnostic environment is calibrated.</p>
        <div className="mt-10 flex justify-center gap-2">
           <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce [animation-delay:-0.3s]" />
           <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce [animation-delay:-0.15s]" />
           <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#161a20] overflow-hidden selection:bg-white selection:text-black">
      {/* Background Educational Video - Cinematic Tech Abstract (Signal Layer) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-[0.1] mix-blend-screen brightness-[1.1]"
        >
          <source 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_180444_a1a13b6a-9f4a-4a2c-8f1a-6a54f67e5005.mp4" 
              type="video/mp4" 
          />
        </video>
        {/* Subtle Multi-layered Ambient Glows - Signature Landing Style */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#161a20] via-transparent to-[#161a20]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161a20]/80 via-transparent to-[#161a20]/90 pointer-events-none" />
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-[1px] opacity-20 pointer-events-none" />
        <div className="absolute inset-0 w-full h-full bg-[#161a20] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <GridPattern

          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 12],
            [15, 10],
            [10, 15],
          ]}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-20 pointer-events-none",
          )}
        />
      </div>

      {/* Primary Assessment Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:py-20 pointer-events-none">
        <div className="pointer-events-auto">
          {renderAssessmentContent()}
        </div>
      </div>
    </div>
  );
};

export default ProctoredAssessment;
