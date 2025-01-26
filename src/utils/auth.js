import axios from 'axios';

const API_URL = 'https://agrolinkcm-bps8.onrender.com/api';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};


export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const { token, user } = response.data;
    setAuthToken(token);
    return { token, user };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    const { token, user } = response.data;
    setAuthToken(token);
    return { token, user };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
