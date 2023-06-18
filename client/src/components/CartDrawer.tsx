import { useSelectProductsState } from '../store/projectStore.selects';
import { calculateTotal, calculateTotalWithTax, formatCurrency } from '../utils/functions';
import ProductCardSmall from './ProductCardSmall';

const CartDrawer = () => {
  const { cartProducts } = useSelectProductsState();
  const subtotal = calculateTotal(cartProducts);
  const total = calculateTotalWithTax(subtotal, 0.15);
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="btn-primary drawer-button btn">
          Open drawer
        </label>
      </div>
      <div className="drawer-side z-50">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
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
            <button className="btn-warning btn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
