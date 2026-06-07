import axiosInstance from './axios';

export const getRecentBattles = async () => {
  const response = await axiosInstance.get('/battles');
  return response.data;
};

export const getUserBattleHistory = async () => {
  const response = await axiosInstance.get('/battles/history/me');
  return response.data;
};

export const getBattleById = async (id: string) => {
  const response = await axiosInstance.get(`/battles/${id}`);
  return response.data;
};
