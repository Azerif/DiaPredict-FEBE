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
