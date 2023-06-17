/** Libraries **/
import { create } from 'zustand';

/** Functional **/
import { CartProduct, ProjectState } from './projectStore.types';

const initialUserState = {
  userName: '',
  userEmail: '',
  userIsLoggedIn: false,
  userActiveTab: 1,
};

const initialCartState = {
  cartProducts: [],
};

const useProjectStore = create<ProjectState>((set) => ({
  ...initialUserState,
  ...initialCartState,
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
}));

export default useProjectStore;
