import useOrderActions from '../hooks/useOrderActions';
import { useSelectOrdersState, useSelectProductsState } from '../store/projectStore.selects';
import { Order } from '../store/projectStore.types';
import { calculateTotalWithTax, formatCurrency } from '../utils/functions';

const OrderCard = (order: Order) => {
  const { orders, orderCurrent, setOrders } = useSelectOrdersState();
  const { cartProducts } = useSelectProductsState();

  const { isEditingOrder, handleStartEdit, handleCancelEdit, handleSaveEdit, handlePay, handleDelete } =
    useOrderActions(order);

  const products = isEditingOrder ? cartProducts : order.products;

  const orderTotal = order.total;
  const orderSubtotal = order.subtotal;
  const orderTax = order.tax * orderSubtotal;
  const date = new Date(order.date).toLocaleDateString('en-GB');

  return (
    <div className="flex flex-col py-5">
      <div className="flex w-full justify-between gap-4 px-1">
        <h3 className="text-sm font-bold">Order Number: {order.id}</h3>
        <p className="text-sm">Date: {date}</p>
      </div>
      <div className="w-full overflow-x-auto rounded-xl border-2 border-gray-200">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="bg-gray-200">
              <th>Product</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const subtotal = product.price * product.quantity;
              const subtotalTax = subtotal * order.tax;
              const total = calculateTotalWithTax(subtotal, 0.15);
              return (
                <tr key={product.id}>
                  <th>
                    <div className="flex items-center space-x-3">
                      <figure className="h-12 w-12 min-w-[50px]">
                        <img className="h-full w-full object-scale-down" src={product.image} alt={product.title} />
                      </figure>
                      <div className="min-w-[150px] max-w-[200px]">
                        <div className="line-clamp-2 h-11 font-bold">{product.title}</div>
                        <div className="text-sm opacity-50">Qty: {product.quantity}</div>
                      </div>
                    </div>
                  </th>
                  <td>{formatCurrency(subtotal, order.currency)}</td>
                  <td>{formatCurrency(subtotalTax, order.currency)}</td>
                  <td>{formatCurrency(total, order.currency)}</td>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr className="bg-gray-200 font-bold text-black">
              <th>
                <span>Currency: &nbsp;</span>
                <select
                  className="select select-xs"
                  disabled={!isEditingOrder}
                  value={order.currency}
                  onChange={(e) => {
                    setOrders(
                      orders.map((o) => {
                        if (o.id === order.id) {
                          return {
                            ...o,
                            currency: e.target.value as 'USD' | 'EUR' | 'HNL',
                          };
                        }
                        return o;
                      }),
                    );
                  }}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="HNL">HNL</option>
                </select>
              </th>
              <th>{formatCurrency(orderSubtotal, order.currency)}</th>
              <th>{formatCurrency(orderTax, order.currency)}</th>
              <th>{formatCurrency(orderTotal, order.currency)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {order.completed ? null : (
        <div className="mt-3 flex justify-end gap-4">
          {isEditingOrder ? (
            <>
              <button className="btn-error btn-outline btn-sm btn w-20" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="btn-success btn-outline btn-sm btn w-20" onClick={handleSaveEdit}>
                Save
              </button>
            </>
          ) : !orderCurrent?.id && orderCurrent?.id !== order.id ? (
            <>
              <button className="btn-info btn-outline btn-sm btn w-20" onClick={handleStartEdit}>
                Edit
              </button>
              <button className="btn-error btn-outline btn-sm btn w-20" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn-success btn-outline btn-sm btn w-20" onClick={handlePay}>
                Pay
              </button>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
