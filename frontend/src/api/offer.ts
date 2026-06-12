import api from './axios';

export interface OfferData {
  base_salary: number;
  sign_on_bonus: number;
  target_bonus: number;
  equity_type: string;
  equity_amount: number;
  strike_price: number;
  current_valuation: number;
  vesting_years: number;
  cliff_months: number;
}

export interface NegotiationMessage {
  role: 'recruiter' | 'candidate' | 'coach';
  content: string;
  tactic?: string;
  coachingTip?: string;
  timestamp: string;
}

export interface NegotiationSession {
  id?: string;
  _id?: string;
  user: string;
  personality: 'heather' | 'fred';
  status: 'active' | 'accepted' | 'rejected' | 'rescinded';
  sentiment: number;
  originalOffer: OfferData;
  currentOffer: OfferData;
  chatHistory: NegotiationMessage[];
  tacticsUsed: string[];
  finalCompensationIncrease: number;
  createdAt?: string;
  updatedAt?: string;
  coachSample?: string; // transient value returned from sendNegotiationMessage
}

export const parseOfferLetter = async (text: string): Promise<OfferData> => {
  const response = await api.post('/offers/parse', { text });
  return response.data.data;
};

export const startNegotiation = async (originalOffer: OfferData, personality: 'heather' | 'fred'): Promise<NegotiationSession> => {
  const response = await api.post('/offers/negotiate/start', { originalOffer, personality });
  return response.data.data;
};

export const sendNegotiationMessage = async (sessionId: string, message: string): Promise<NegotiationSession> => {
  const response = await api.post('/offers/negotiate/message', { sessionId, message });
  return response.data.data;
};

export const completeNegotiation = async (sessionId: string, status: 'accepted' | 'rejected'): Promise<NegotiationSession> => {
  const response = await api.post('/offers/negotiate/complete', { sessionId, status });
  return response.data.data;
};

export const getNegotiationHistory = async (): Promise<NegotiationSession[]> => {
  const response = await api.get('/offers/negotiate/history');
  return response.data.data;
};

export const getNegotiationSession = async (sessionId: string): Promise<NegotiationSession> => {
  const response = await api.get(`/offers/negotiate/${sessionId}`);
  return response.data.data;
};
