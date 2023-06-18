import { useEffect, useRef, useState } from 'react';
import { useSelectOrdersState } from '../store/projectStore.selects';
import OrderCard from './OrderCard';

const AllOrders = () => {
  const { orders } = useSelectOrdersState();
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const statusFilter = useRef<HTMLSelectElement>(null);
  const ratingFilter = useRef<HTMLSelectElement>(null);

  const getFilteredOrders = () => {
    const statusValue = statusFilter.current ? statusFilter.current.value : null;
    const ratingValue = ratingFilter.current ? ratingFilter.current.value : null;
    const newOrders = orders.filter((order) => {
      const ratingCondition = ratingValue ? order.rating === +ratingValue : true;
      switch (statusValue) {
        case 'active':
          return !order.completed && ratingCondition;
        case 'completed':
          return order.completed && ratingCondition;
        default:
          return true && ratingCondition;
      }
    });
    setFilteredOrders(newOrders);
  };

  const sortOrdersByPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    const newOrders = [...filteredOrders];
    switch (sortValue) {
      case 'asc':
        newOrders.sort((a, b) => a.total - b.total);
        break;
      case 'desc':
        newOrders.sort((a, b) => b.total - a.total);
        break;
      default:
        break;
    }
    setFilteredOrders(newOrders);
  };

  useEffect(() => {
    getFilteredOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);
  return (
    <div className="flex w-full flex-col gap-4 pt-4">
      <div className="flex gap-4 px-3">
        <select
          ref={statusFilter}
          className="select select-sm w-1/4 border-gray-300 px-3"
          placeholder="status"
          onChange={getFilteredOrders}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select
          ref={ratingFilter}
          className="select select-sm w-1/4 border-gray-300 px-3"
          placeholder="status"
          onChange={getFilteredOrders}
        >
          <option value="">All Ratings</option>
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
        <select className="select select-sm w-1/4 border-gray-300 px-3" onChange={sortOrdersByPrice}>
          <option value="" disabled selected>
            Sort By Price
          </option>
          <option value="desc">$ Descending</option>
          <option value="asc">$ Ascending</option>
        </select>
      </div>
      <div className="flex w-full flex-col gap-4 overflow-auto px-3">
        {filteredOrders.map((order) => {
          return <OrderCard key={order.id} {...order} />;
        })}
      </div>
    </div>
  );
};

export default AllOrders;
