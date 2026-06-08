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

export const parseOfferLetter = async (text: string): Promise<OfferData> => {
  const response = await api.post('/offers/parse', { text });
  return response.data.data;
};
