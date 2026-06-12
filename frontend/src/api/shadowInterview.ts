import api from './axios';
import { CodingProblem } from './codingLab';

export interface ShadowInterviewMessage {
  sender: 'recruiter' | 'candidate';
  text: string;
  codeSnapshot?: string;
  timestamp: string;
}

export interface SpeechMetrics {
  wordsPerMinute: number;
  fillerWordsCount: number;
  detectedFillers: string[];
  silenceGaps: number;
}

export interface OverallEvaluation {
  codeScore: number;
  communicationScore: number;
  finalCode: string;
  feedbackSummary: string;
}

export interface ShadowInterviewSession {
  _id?: string;
  user: string;
  problemId: string;
  status: 'active' | 'completed';
  recruiterPersonality: string;
  speechMetrics: SpeechMetrics;
  overallEvaluation: OverallEvaluation;
  conversationHistory: ShadowInterviewMessage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StepResponse {
  session: ShadowInterviewSession;
  coachingTip: string;
  shouldInterrupt: boolean;
  evaluation: {
    correctness: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
}

export interface StartResponse {
  session: ShadowInterviewSession;
  problem: CodingProblem;
}

export const startShadowInterview = async (
  problemId: string,
  recruiterPersonality: 'heather' | 'fred'
): Promise<StartResponse> => {
  const response = await api.post('/shadow-interview/start', { problemId, recruiterPersonality });
  return response.data.data;
};

export const sendShadowInterviewMessage = async (
  sessionId: string,
  message: string,
  code: string
): Promise<StepResponse> => {
  const response = await api.post('/shadow-interview/message', { sessionId, message, code });
  return response.data.data;
};

export const completeShadowInterview = async (
  sessionId: string,
  code: string
): Promise<ShadowInterviewSession> => {
  const response = await api.post('/shadow-interview/complete', { sessionId, code });
  return response.data.data;
};
