import { useState, useCallback, useRef, useEffect } from 'react';

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
        for (let i = 0; i < event.results.length; i++) {
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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    // 1. Cancel any active native speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // 2. Cancel any active Audio playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const cleanedText = cleanTextForSpeech(text);

    if (!window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = (e) => {
      console.error('Native speech error:', e);
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };

    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const speakText = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;

      // Sort voices to find the best match for Indian accent / Hindi
      const sortedVoices = [...voices].sort((a, b) => {
        const getScore = (voice: SpeechSynthesisVoice) => {
          let score = 0;
          const name = voice.name.toLowerCase();
          const lang = voice.lang.toLowerCase().replace('_', '-');

          // 1. Language code matches: Prioritize Indian English (en-in) and Hindi (hi-in)
          if (lang.startsWith('en-in')) {
            score += 150;
          } else if (lang.startsWith('hi-in')) {
            score += 120;
          } else if (lang.startsWith('en-')) {
            score += 50; // Other English dialects (US, UK, GB, AU, CA)
          } else if (lang === 'en') {
            score += 40;
          } else if (lang.startsWith('hi-')) {
            score += 30;
          }

          // 2. Specific Indian voice name identifiers
          const nameMatches = ['india', 'neerja', 'heera', 'harsh', 'ravi', 'madhur', 'swara', 'hemant', 'kalpana', 'dilip', 'prabhat', 'google translation'];
          nameMatches.forEach(match => {
            if (name.includes(match)) {
              score += 50;
            }
          });

          // 3. Quality indicators
          if (name.includes('natural')) score += 30;
          if (name.includes('neural')) score += 25;
          if (name.includes('online')) score += 15;
          if (name.includes('google')) score += 10;
          if (name.includes('microsoft')) score += 5;

          return score;
        };
        return getScore(b) - getScore(a);
      });

      utterance.voice = sortedVoices[0];
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
    // Cancel any active speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // Cancel any active audio playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
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
