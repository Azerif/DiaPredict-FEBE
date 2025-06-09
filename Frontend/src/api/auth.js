import axios from '@api/axiosInstance';

export const registerUser = async (payload) => {
  try {
    const response = await axios.post('/auth/register', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axios.post('/auth/login', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const forgotPassword = async (data) => {
  const response = await axios.post('/auth/forgot-password', data);
  return response.data;
};

export const verifyResetCode = async (data) => {
  const response = await axios.post('/auth/verify-reset-code', data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axios.post('/auth/reset-password', data);
  return response.data;
};
