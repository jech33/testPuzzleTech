/** Functional **/
import { useSelectOrdersState, useSelectProductsState } from '../store/projectStore.selects';
import { Order } from '../store/projectStore.types';
import { calculateTotal, calculateTotalWithTax } from '../utils/functions';

const useOrderActions = (order: Order) => {
  const { orders, orderEditingId, orderCurrent, setOrders, setOrderCurrent, setOrderEditingId } =
    useSelectOrdersState();
  const { cartProducts, setCartProducts } = useSelectProductsState();

  const isEditingOrder = orderEditingId && orderEditingId === order.id;

  const subtotal = calculateTotal(cartProducts);
  const total = calculateTotalWithTax(subtotal, 0.15);

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

  const handleSaveEdit = () => {
    setOrders(
      orders.map((o) => {
        if (o.id === order?.id) {
          return {
            ...order,
            products: cartProducts,
            total: total,
            subtotal: subtotal,
            date: new Date().toISOString(),
          };
        }
        return o;
      }),
    );
    setOrderEditingId('');
    setCartProducts([]);
    setOrderCurrent(null);
  };

  const handlePay = () => {
    setOrders(
      orders.map((o) => {
        if (o.id === order?.id) {
          return {
            ...order,
            completed: true,
          };
        }
        return o;
      }),
    );
  };

  const handleDelete = () => {
    setOrders(orders.filter((o) => o.id !== order.id));
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
