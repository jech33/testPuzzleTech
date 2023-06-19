import { shallow } from 'zustand/shallow';
import useProjectStore from './projectStore';

export const useSelectUserState = () => {
  return useProjectStore(
    ({
      userActiveTab,
      userId,
      userEmail,
      userIsLoggedIn,
      setUserActiveTab,
      setUserId,
      setUserEmail,
      setUserIsLoggedIn,
      clearUser,
    }) => ({
      userActiveTab,
      userId,
      userEmail,
      userIsLoggedIn,
      setUserActiveTab,
      setUserId,
      setUserEmail,
      setUserIsLoggedIn,
      clearUser,
    }),
    shallow,
  );
};

export const useSelectProductsState = () => {
  return useProjectStore(
    ({ products, productsLoading, cartProducts, setCartProducts, clearCart }) => ({
      products,
      productsLoading,
      cartProducts,
      setCartProducts,
      clearCart,
    }),
    shallow,
  );
};

export const useSelectOrdersState = () => {
  return useProjectStore(
    ({ orders, orderCurrent, orderEditingId, setOrders, setOrderCurrent, setOrderEditingId }) => ({
      orders,
      orderCurrent,
      orderEditingId,
      setOrders,
      setOrderCurrent,
      setOrderEditingId,
    }),
    shallow,
  );
};
