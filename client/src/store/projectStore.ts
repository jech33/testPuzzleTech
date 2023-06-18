/** Libraries **/
import { create } from 'zustand';

/** Functional **/
import { CartProduct, Order, ProjectState } from './projectStore.types';
import { getFakeProducts } from '../services/fakeStoreApi';
import { persist, subscribeWithSelector } from 'zustand/middleware';

const initialUserState = {
  userName: '',
  userEmail: '',
  userIsLoggedIn: false,
  userActiveTab: 1,
};

const initialCartState = {
  cartProducts: [],
};

const useProjectStore = create<ProjectState, [['zustand/subscribeWithSelector', never], ['zustand/persist', unknown]]>(
  subscribeWithSelector(
    persist(
      (set) => ({
        ...initialUserState,
        ...initialCartState,
        products: [],
        productsLoading: true,
        orders: [],
        orderCurrent: null,
        orderEditingId: '',
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
        setOrders: (orders: Order[]) => {
          set(() => ({ orders }));
        },
        setOrderCurrent: (orderCurrent: Order | null) => {
          set(() => ({ orderCurrent }));
        },
        setOrderEditingId: (orderEditingId: string) => {
          set(() => ({ orderEditingId }));
        },
      }),
      {
        name: 'puzzle-tech-storage',
        partialize: ({ userName, userEmail, userIsLoggedIn, userActiveTab }) => ({
          userName,
          userEmail,
          userIsLoggedIn,
          userActiveTab,
        }),
      },
    ),
  ),
);

getFakeProducts().then((products: CartProduct[]) => {
  useProjectStore.setState({ products, productsLoading: false });
});

export default useProjectStore;
