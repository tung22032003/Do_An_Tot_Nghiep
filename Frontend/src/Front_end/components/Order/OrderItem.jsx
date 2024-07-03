
import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{new Date(order.date).toLocaleDateString()}</td>
      <td>{order.type}</td>
      <td>{order.value}</td>
      <td>{order.status}</td>
      <td>{order.action}</td>
    </tr>
  );
};

export default OrderItem;
