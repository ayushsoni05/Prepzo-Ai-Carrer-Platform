import axiosInstance from './axios';

export const getTournaments = async () => {
  const response = await axiosInstance.get('/tournaments');
  return response.data;
};

export const getTournamentById = async (id: string) => {
  const response = await axiosInstance.get(`/tournaments/${id}`);
  return response.data;
};
