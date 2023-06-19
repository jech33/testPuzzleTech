import axios from 'axios';
import { Order, OrderCreation } from '../store/projectStore.types';

const puzzleTechApiInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const login = async (email: string, password: string) => {
  try {
    const response = await puzzleTechApiInstance({
      method: 'POST',
      url: '/auth/login',
      data: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await puzzleTechApiInstance({
      method: 'POST',
      url: '/auth/register',
      data: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrders = async (userId: string) => {
  try {
    const response = await puzzleTechApiInstance({
      method: 'GET',
      url: '/orders',
      params: {
        user: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postOrder = async (order: OrderCreation) => {
  try {
    const response = await puzzleTechApiInstance({
      method: 'POST',
      url: '/orders',
      data: order,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = async (order: Order) => {
  try {
    const response = await puzzleTechApiInstance({
      method: 'PUT',
      url: `/orders/${order.id}`,
      data: order,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await puzzleTechApiInstance({
      method: 'DELETE',
      url: `/orders/${orderId}`,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
