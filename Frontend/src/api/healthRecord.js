import axios from '@api/axiosInstance';

export const getAllHealthRecords = async () => {
  try {
    const response = await axios.get('health-records');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const getHealthRecordById = async (id) => {
  try {
    const response = await axios.get(`health-records/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const createHealthRecord = async (payload) => {
  try {
    const response = await axios.post('health-records', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const updateHealthRecord = async (id, payload) => {
  try {
    const response = await axios.put(`health-records/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const deleteHealthRecord = async (id) => {
  try {
    const response = await axios.delete(`health-records/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};
