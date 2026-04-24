import API from './axios';

export interface InterviewQuestion {
  _id: string;
  questionId: string;
  category: string;
  subSkill: string;
  question: string;
  answer: string;
  difficulty: string;
  keywords: string[];
}

export interface CategoryData {
  category: string;
  subSkills: string[];
}

export const getCategories = async (): Promise<CategoryData[]> => {
  const response = await API.get('/question-bank/categories');
  return response.data.data;
};

export const getQuestions = async (params: {
  category?: string;
  subSkill?: string;
  difficulty?: string;
  search?: string;
}): Promise<InterviewQuestion[]> => {
  const response = await API.get('/question-bank/questions', { params });
  return response.data.data;
};
