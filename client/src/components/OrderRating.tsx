import { Order } from '../store/projectStore.types';
import { useEffect, useRef } from 'react';
import { updateOrder } from '../services/puzzleTechApi';
import useOrders from '../hooks/useOrders';

const OrderRating = (props: Order) => {
  const order = props;
  const { fetchOrders } = useOrders();

  const ratingValues = [1, 2, 3, 4, 5];
  const ratingRef = useRef<HTMLDivElement>(null);

  const handleRatingChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateOrder({
        ...order,
        rating: parseInt(e.target.value),
      });
      alert('Order rated successfully!');
      await fetchOrders();
    } catch (error) {
      console.error(error);
    }
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
