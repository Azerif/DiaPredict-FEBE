import axios from '@api/axiosInstance';

export const getAllPredictions = async () => {
  try {
    const response = await axios.get('predictions');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const getPredictionById = async (id) => {
  try {
    const response = await axios.get(`predictions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const createPrediction = async (payload) => {
  try {
    const response = await axios.post('predictions', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const deletePrediction = async (id) => {
  try {
    const response = await axios.delete(`predictions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};