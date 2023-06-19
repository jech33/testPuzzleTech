/** Libraries **/
import { create } from 'zustand';

/** Functional **/
import { CartProduct, Order, ProjectState } from './projectStore.types';
import { getFakeProducts } from '../services/fakeStoreApi';
import { persist, subscribeWithSelector } from 'zustand/middleware';

const initialUserState = {
  userId: '',
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
        setUserId: (userId: string) => {
          set(() => ({ userId }));
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
        partialize: ({ userId, userEmail, userIsLoggedIn, userActiveTab }) => ({
          userId,
          userEmail,
          userIsLoggedIn,
          userActiveTab,
        }),
      },
    ),
  ),
);

getFakeProducts().then((products: CartProduct[]) => {
  const newProducts: CartProduct[] = products.map((product) => ({
    ...product,
    id: product.id.toString(),
  }));
  useProjectStore.setState({ products: newProducts, productsLoading: false });
});

export default useProjectStore;
