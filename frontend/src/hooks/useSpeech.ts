const cleanTextForSpeech = (text: string): string => {
  return text
    .replace(/and\/or/gi, 'and or')
    .replace(/CI\/CD/gi, 'C.I. C.D.')
    .replace(/render\/vercel/gi, 'Render or Vercel')
    .replace(/frontend\/backend/gi, 'frontend and backend')
    .replace(/\//g, ' or ') // Convert other general slashes to 'or'
    .replace(/[•\-\*]/g, '') // Strip bullet points, list dashes, asterisks
    .replace(/[`\[\]\(\)]/g, '') // Strip brackets, parenthesis, backticks
    .replace(/[\_]/g, '') // Strip markdown underscores
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
};

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const cleanedText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      setIsSpeaking(false);
    };

    // Optimization for Clarity
    utterance.rate = 0.92; // Slower speed matching human conversational cadence
    utterance.pitch = 1.0;  // Natural pitch
    utterance.volume = 1.0;

    const speakText = () => {
      const voices = window.speechSynthesis.getVoices();
      const enVoices = voices.filter(v => v.lang.startsWith('en'));

      if (enVoices.length > 0) {
        // Sort voices using a detailed scoring matrix
        const sortedVoices = [...enVoices].sort((a, b) => {
          const getScore = (voice: SpeechSynthesisVoice) => {
            let score = 0;
            const name = voice.name.toLowerCase();

            // Language match preference (US & GB English are usually higher quality)
            if (voice.lang === 'en-US' || voice.lang === 'en-GB') {
              score += 5;
            }

            // Neural/Natural indicators
            if (name.includes('natural')) score += 50;
            if (name.includes('neural')) score += 45;
            if (name.includes('online')) score += 30;
            if (name.includes('google')) score += 20;
            if (name.includes('microsoft')) score += 10;

            // Character/Gender matching: Sarah Vance is a female recruiter, so boost female names
            const femaleKeywords = ['aria', 'jenny', 'sonia', 'female', 'sara', 'zira', 'hazel', 'guy'];
            // Note: guy is male, but it's Microsoft Edge's top natural voice, which still sounds highly realistic as a fallback
            femaleKeywords.forEach(keyword => {
              if (name.includes(keyword)) {
                if (keyword === 'guy') {
                  score += 1; // minor boost for high quality male fallback
                } else {
                  score += 8; // higher boost for female natural voices
                }
              }
            });

            return score;
          };
          return getScore(b) - getScore(a);
        });

        const preferredVoice = sortedVoices[0];
        console.log('Selected real voice for recruiter:', preferredVoice.name, 'Language:', preferredVoice.lang);
        utterance.voice = preferredVoice;
      } else if (voices.length > 0) {
        utterance.voice = voices[0];
      }

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speakText;
    } else {
      speakText();
    }
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    setTranscript('');
    setIsListening(true);
    recognitionRef.current.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return {
    speak,
    startListening,
    stopListening,
    isListening,
    transcript,
    isSpeaking
  };
};
