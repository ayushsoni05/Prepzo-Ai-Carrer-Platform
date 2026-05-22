import api from './axios';

export interface SubmissionData {
  problemId: string;
  language: string;
  code: string;
  status: string;
  testCasesPassed: number;
  totalTestCases: number;
  difficulty?: string;
}

export const createSubmission = async (data: SubmissionData) => {
  try {
    const response = await api.post('/submissions', data);
    return response.data;
  } catch (error) {
    console.error('Error creating submission:', error);
    throw error;
  }
};

export const getSubmissionsByProblem = async (problemId: string) => {
  try {
    const response = await api.get(`/submissions/problem/${problemId}`);
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};
