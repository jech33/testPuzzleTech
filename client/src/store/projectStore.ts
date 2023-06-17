/** Libraries **/
import { create } from 'zustand';

/** Functional **/
import { CartProduct, ProjectState } from './projectStore.types';
import { getFakeProducts } from '../services/axios';
import { subscribeWithSelector } from 'zustand/middleware';

const initialUserState = {
  userName: '',
  userEmail: '',
  userIsLoggedIn: false,
  userActiveTab: 1,
};

const initialCartState = {
  cartProducts: [],
};

const useProjectStore = create<ProjectState, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector((set) => ({
    ...initialUserState,
    ...initialCartState,
    products: [],
    productsLoading: true,
    clearUser: () => {
      set(() => initialUserState);
    },
    clearCart: () => {
      set(() => initialCartState);
    },
    setUserName: (userName: string) => {
      set(() => ({ userName }));
    },
    setUserEmail: (userEmail: string) => {
      set(() => ({ userEmail }));
    },
    setUserIsLoggedIn: (userIsLoggedIn: boolean) => {
      set(() => ({ userIsLoggedIn }));
    },
    setUserActiveTab: (userActiveTab: number) => {
      set(() => ({ userActiveTab }));
    },
    setCartProducts: (cartProducts: CartProduct[]) => {
      set(() => ({ cartProducts }));
    },
  })),
);

getFakeProducts().then((products: CartProduct[]) => {
  useProjectStore.setState({ products, productsLoading: false });
});

export default useProjectStore;
