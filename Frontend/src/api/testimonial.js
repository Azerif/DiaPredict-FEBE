import axios from './axiosInstance';

export const getAllTestimonials = async () => {
  try {
    const response = await axios.get('/testimonials');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const getTestimonialsForLanding = async (limit = 6) => {
  try {
    const response = await axios.get(`/testimonials/landing?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const getUserTestimonials = async () => {
  try {
    const response = await axios.get('/testimonials/user/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const createTestimonial = async (testimonialData) => {
  try {
    const response = await axios.post('/testimonials', testimonialData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const updateTestimonial = async (id, testimonialData) => {
  try {
    const response = await axios.put(`/testimonials/${id}`, testimonialData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(`/testimonials/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};