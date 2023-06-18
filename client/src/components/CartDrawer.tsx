/** Functional **/
import useOrderActions from '../hooks/useOrderActions';
import { useSelectOrdersState, useSelectProductsState } from '../store/projectStore.selects';
import { Order } from '../store/projectStore.types';
import { calculateTotal, calculateTotalWithTax, formatCurrency } from '../utils/functions';
import ProductCardSmall from './ProductCardSmall';

/** Assets **/
import { MdShoppingCart } from 'react-icons/md';

const CartDrawer = () => {
  const { cartProducts, setCartProducts } = useSelectProductsState();
  const { orders, orderEditingId, setOrders } = useSelectOrdersState();
  const subtotal = calculateTotal(cartProducts);
  const total = calculateTotalWithTax(subtotal, 0.15);

  const order = orders.find((order) => order.id === orderEditingId) || orders[0];

  const { handleCancelEdit, handleSaveEdit } = useOrderActions(order);

  const handleCandelButton = () => {
    handleCancelEdit();
    document.getElementById('cart-drawer')?.click();
  };

  const handleSaveButton = () => {
    handleSaveEdit();
    document.getElementById('cart-drawer')?.click();
  };

  const handleCheckout = () => {
    alert('TODO: Post order to api');
    if (cartProducts.length > 0) {
      const newOrder: Order = {
        id: Math.random().toString(),
        products: cartProducts,
        total,
        subtotal,
        tax: 0.15,
        date: new Date().toISOString(),
        completed: false,
        currency: 'USD',
        rating: 0,
      };
      setOrders([...orders, newOrder]);
      setCartProducts([]);
      document.getElementById('cart-drawer')?.click();
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="cart-drawer" className="btn-circle btn bg-white">
          <MdShoppingCart size="1.75rem" />
        </label>
      </div>
      <div className="drawer-side z-50">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="cart-drawer" className="drawer-overlay"></label>
        <div className="flex h-full flex-col justify-between bg-white">
          <ul className="flex w-80 flex-col gap-3 overflow-scroll p-4 text-base-content">
            {/* Sidebar content here */}
            {cartProducts.map((product) => {
              return (
                <li key={product.id}>
                  <ProductCardSmall {...product} />
                </li>
              );
            })}
          </ul>
          {!cartProducts.length ? null : (
            <div className="flex flex-col gap-7 border-t-2 border-gray-300 p-4 shadow-[0_-1px_10px_0_rgba(50,50,50,0.1)]">
              <ul className="flex flex-col gap-1">
                <li className="flex justify-between">
                  <h4 className="m-0">Subtotal</h4>
                  <h4 className="m-0">{formatCurrency(subtotal, 'USD')}</h4>
                </li>
                <li className="flex justify-between">
                  <h4 className="m-0">Tax</h4>
                  <h4 className="m-0">15%</h4>
                </li>
                <li className="flex justify-between font-bold">
                  <h4 className="m-0">Total</h4>
                  <h4 className="m-0">{formatCurrency(total, 'USD')}</h4>
                </li>
              </ul>
              {orderEditingId ? (
                <div className="box-border flex justify-stretch gap-4">
                  <button className="btn-error btn grow" onClick={handleCandelButton}>
                    Cancel
                  </button>
                  <button className="btn-success btn grow" onClick={handleSaveButton}>
                    Save
                  </button>
                </div>
              ) : (
                <button className="btn-warning btn" onClick={handleCheckout}>
                  Checkout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
