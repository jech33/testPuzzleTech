import { useState } from 'react';
import { useSelectOrdersState } from '../store/projectStore.selects';
import OrderCard from './OrderCard';

const AllOrders = () => {
  const { orders } = useSelectOrdersState();
  const [filteredOrders, setfilteredOrders] = useState(orders);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newOrders = orders.filter((order) => {
      switch (value) {
        case 'active':
          return !order.completed;
        case 'completed':
          return order.completed;
        default:
          return true;
      }
    });
    setfilteredOrders(newOrders);
  };
  return (
    <div className="flex w-full flex-col gap-4 pt-4">
      <div className="flex px-3">
        <select className="select select-sm w-1/4 border-gray-300 px-3" placeholder="status" onChange={handleFilter}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
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
