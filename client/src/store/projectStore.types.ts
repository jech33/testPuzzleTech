/* eslint-disable no-unused-vars */
export type ProjectState = {
  userId: string;
  userEmail: string;
  userIsLoggedIn: boolean;
  userActiveTab: number;
  products: CartProduct[];
  productsLoading: boolean;
  cartProducts: CartProduct[];
  orders: Order[];
  orderCurrent: Order | null;
  orderEditingId: string;
  setUserId: (userId: string) => void;
  setUserEmail: (userEmail: string) => void;
  setUserIsLoggedIn: (userIsLoggedIn: boolean) => void;
  setUserActiveTab: (userActiveTab: number) => void;
  setCartProducts: (cartProducts: CartProduct[]) => void;
  setOrders: (orders: Order[]) => void;
  setOrderCurrent: (orderCurrent: Order | null) => void;
  setOrderEditingId: (orderEditingId: string) => void;
  clearUser: () => void;
  clearCart: () => void;
};

export type CartProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
};

export type Order = {
  id: string;
  products: CartProduct[];
  total: number;
  subtotal: number;
  tax: number;
  date: string;
  completed: boolean;
  rating: number;
  currency: 'USD' | 'EUR' | 'HNL';
};

export type OrderCreation = {
  user: string;
  products: CartProduct[];
  total: number;
  subtotal: number;
  tax: number;
  date: string;
  completed: boolean;
  rating: number;
  currency: 'USD' | 'EUR' | 'HNL';
};
