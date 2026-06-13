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

    // 2. Cancel any active Google Translate Audio speech
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const cleanedText = cleanTextForSpeech(text);

    // Fallback function for native Web Speech Synthesis
    const playNativeFallback = () => {
      if (!window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEnd) onEnd();
      };
      utterance.onerror = (e) => {
        console.error('Native speech error:', e);
        setIsSpeaking(false);
      };

      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const speakText = () => {
        const voices = window.speechSynthesis.getVoices();
        const enVoices = voices.filter(v => v.lang.startsWith('en'));

        if (enVoices.length > 0) {
          const sortedVoices = [...enVoices].sort((a, b) => {
            const getScore = (voice: SpeechSynthesisVoice) => {
              let score = 0;
              const name = voice.name.toLowerCase();
              const lang = voice.lang.toLowerCase();

              // Prioritize Indian English lang code
              if (lang === 'en-in') {
                score += 100;
              } else if (lang === 'en-us' || lang === 'en-gb') {
                score += 5;
              }

              // Neural/Natural indicators
              if (name.includes('natural')) score += 50;
              if (name.includes('neural')) score += 45;
              if (name.includes('online')) score += 30;
              if (name.includes('google')) score += 20;
              if (name.includes('microsoft')) score += 10;

              // Indian voice names (e.g. Neerja, Heera, Prabhat, Google India)
              if (name.includes('india') || name.includes('neerja') || name.includes('heera') || name.includes('harsh') || name.includes('ravi')) {
                score += 40;
              }

              return score;
            };
            return getScore(b) - getScore(a);
          });
          utterance.voice = sortedVoices[0];
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
    };

    // Attempt Google Translate Neural TTS for high-fidelity human voice in Indian English
    const chunks: string[] = [];
    const words = cleanedText.split(' ');
    let currentChunk = '';
    
    words.forEach(word => {
      if ((currentChunk + ' ' + word).length > 180) {
        chunks.push(currentChunk.trim());
        currentChunk = word;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + word;
      }
    });
    if (currentChunk) chunks.push(currentChunk.trim());

    if (chunks.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    let currentIdx = 0;
    
    const playNextChunk = () => {
      if (currentIdx >= chunks.length) {
        setIsSpeaking(false);
        audioRef.current = null;
        if (onEnd) onEnd();
        return;
      }

      const chunk = chunks[currentIdx];
      const url = `/api/public/tts?text=${encodeURIComponent(chunk)}&lang=en-IN`;
      
      const audio = new Audio(url);
      audioRef.current = audio;

      if (currentIdx === 0) {
        setIsSpeaking(true);
      }

      audio.onended = () => {
        currentIdx++;
        playNextChunk();
      };

      audio.onerror = (e) => {
        console.error('Google Translate TTS failed, falling back to native SpeechSynthesis:', e);
        playNativeFallback();
      };

      audio.play().catch(err => {
        console.warn('Audio auto-play blocked, falling back to native SpeechSynthesis:', err);
        playNativeFallback();
      });
    };

    playNextChunk();
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
