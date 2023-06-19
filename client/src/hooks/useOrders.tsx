import { getOrders } from '../services/puzzleTechApi';
import { useSelectOrdersState, useSelectUserState } from '../store/projectStore.selects';

const useOrders = () => {
  const { userId } = useSelectUserState();
  const { setOrders } = useSelectOrdersState();
  const fetchOrders = async () => {
    try {
      const res = await getOrders(userId);
      setOrders(res.data.orders.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  return {
    fetchOrders,
  };
};

export default useOrders;
