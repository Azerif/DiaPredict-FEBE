import axios from '@api/axiosInstance';

export const getProfile = async () => {
  try {
    const response = await axios.get('users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const updateProfile = async (payload) => {
  try {
    const response = await axios.put('users/profile', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const uploadProfilePicture = async (file) => {
  try {
    const formData = new FormData();
     formData.append('profile_picture', file);

    const response = await axios.post('users/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const deleteProfilePicture = async () => {
  try {
    const response = await axios.delete('users/profile/picture');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};

export const updatePassword = async (payload) => {
  try {
    const response = await axios.put('users/password', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Unknown error' };
  }
};
