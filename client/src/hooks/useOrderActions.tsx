/** Functional **/
import { deleteOrder, getOrders, updateOrder } from '../services/puzzleTechApi';
import { useSelectOrdersState, useSelectProductsState, useSelectUserState } from '../store/projectStore.selects';
import { Order } from '../store/projectStore.types';
import { calculateTotal, calculateTotalWithTax } from '../utils/functions';

const useOrderActions = (order: Order) => {
  const { userId } = useSelectUserState();
  const { orders, orderEditingId, orderCurrent, setOrders, setOrderCurrent, setOrderEditingId } =
    useSelectOrdersState();
  const { cartProducts, setCartProducts } = useSelectProductsState();

  const isEditingOrder = orderEditingId && orderEditingId === order.id;

  const subtotal = calculateTotal(cartProducts);
  const total = calculateTotalWithTax(subtotal, 0.15);

  const fetchOrders = async () => {
    try {
      const res = await getOrders(userId);
      setOrders(res.data.orders.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEdit = () => {
    setOrderEditingId(order.id);
    setOrderCurrent(order);
    setCartProducts(order.products);
  };

  const handleCancelEdit = () => {
    setOrderEditingId('');
    setOrders(orders.map((o) => (o.id === orderCurrent?.id ? orderCurrent : o)));
    setCartProducts([]);
    setOrderCurrent(null);
  };

  const handleSaveEdit = async () => {
    setOrderEditingId('');
    setCartProducts([]);
    setOrderCurrent(null);
    try {
      await updateOrder({
        ...order,
        products: cartProducts,
        total: total,
        subtotal: subtotal,
        date: new Date().toISOString(),
      });
      alert('Order updated successfully!');
      await fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePay = async () => {
    try {
      await updateOrder({
        ...order,
        completed: true,
      });
      alert('Payment done successfully!');
      await fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm('Are you sure you want to delete this order?')) {
        await deleteOrder(order.id);
        fetchOrders();
        alert('Order deleted successfully!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isEditingOrder,
    handleStartEdit,
    handleCancelEdit,
    handleSaveEdit,
    handlePay,
    handleDelete,
  };
};

export default useOrderActions;
