import { shallow } from 'zustand/shallow';
import useProjectStore from './projectStore';

export const useSelectUserState = () => {
  return useProjectStore(
    ({
      userActiveTab,
      userName,
      userEmail,
      userIsLoggedIn,
      setUserActiveTab,
      setUserName,
      setUserEmail,
      setUserIsLoggedIn,
      clearUser,
    }) => ({
      userActiveTab,
      userName,
      userEmail,
      userIsLoggedIn,
      setUserActiveTab,
      setUserName,
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
