import { Order } from '../store/projectStore.types';
import { useSelectOrdersState } from '../store/projectStore.selects';
import { useEffect, useRef } from 'react';

const OrderRating = (props: Order) => {
  const order = props;
  const { orders, setOrders } = useSelectOrdersState();

  const ratingValues = [1, 2, 3, 4, 5];
  const ratingRef = useRef<HTMLDivElement>(null);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrders = orders.map((o) => {
      if (o.id === order.id) {
        return {
          ...order,
          rating: parseInt(e.target.value),
        };
      }
      return o;
    });
    setOrders(newOrders);
  };

  useEffect(() => {
    const ratingInputs = ratingRef.current?.children;
    if (ratingInputs) {
      for (let i = 0; i < ratingInputs.length; i++) {
        const input = ratingInputs[i] as HTMLInputElement;
        if (input.value === order.rating.toString()) {
          input.checked = true;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ratingRef} className="rating">
      {ratingValues.map((value) => {
        return (
          <input
            key={value}
            type="radio"
            name={`rating-${order.id}`}
            className="mask mask-star-2 bg-orange-400"
            value={value}
            onChange={handleRatingChange}
          />
        );
      })}
    </div>
  );
};

export default OrderRating;
