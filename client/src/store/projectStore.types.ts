/* eslint-disable no-unused-vars */
export type ProjectState = {
  userName: string;
  userEmail: string;
  userIsLoggedIn: boolean;
  cartProducts: CartProduct[];
  setUserName: (userName: string) => void;
  setUserEmail: (userEmail: string) => void;
  setUserIsLoggedIn: (userIsLoggedIn: boolean) => void;
  setCartProducts: (cartProducts: CartProduct[]) => void;
  clearUser: () => void;
  clearCart: () => void;
};

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
