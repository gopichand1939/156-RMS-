import axios from 'axios';

export const registerUser = async (userData) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const { data } = await axios.post('/api/users', userData, config);
  return data;
};
