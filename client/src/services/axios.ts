import axios from 'axios';
// Create instance called instance
const fakestoreInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const getFakeProducts = async () => {
  try {
    const response = await fakestoreInstance({
      method: 'GET',
      url: '/products',
      params: {
        search: 'parameter',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
