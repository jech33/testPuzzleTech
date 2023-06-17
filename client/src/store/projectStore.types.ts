/* eslint-disable no-unused-vars */
export type ProjectState = {
  userName: string;
  userEmail: string;
  userIsLoggedIn: boolean;
  userActiveTab: number;
  products: CartProduct[];
  productsLoading: boolean;
  cartProducts: CartProduct[];
  setUserName: (userName: string) => void;
  setUserEmail: (userEmail: string) => void;
  setUserIsLoggedIn: (userIsLoggedIn: boolean) => void;
  setUserActiveTab: (userActiveTab: number) => void;
  setCartProducts: (cartProducts: CartProduct[]) => void;
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
