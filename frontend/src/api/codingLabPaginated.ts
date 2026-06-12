import api from './axios';
import { CodingProblem } from './codingLab';

export interface PaginatedProblemsResponse {
  problems: CodingProblem[];
  totalProblems: number;
  totalPages: number;
  currentPage: number;
}

export const getCodingProblemsPaginated = async (params?: {
  search?: string;
  difficulty?: string;
  company?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedProblemsResponse> => {
  try {
    const response = await api.get('/coding-problems', { params });
    if (response.data && response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.warn("Backend unavailable or network error. Falling back to local stubs.", error);
  }
  
  // Minimal fallback stub list in case server is offline
  return {
    problems: [
      {
        id: "two-sum",
        title: "Two Sum",
        description: "Given an array of integers, return indices of the two numbers such that they add up to target.",
        difficulty: "Easy",
        acceptanceRate: 47,
        companyTags: ["Array", "Hash Table"],
        hints: [],
        starterCode: { javascript: "", python: "", cpp: "", java: "" },
        testCases: []
      }
    ],
    totalProblems: 1,
    totalPages: 1,
    currentPage: 1
  };
};
