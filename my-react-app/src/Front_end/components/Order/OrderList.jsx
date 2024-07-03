
import React, { useState } from 'react';
import OrderItem from './OrderItem';
import './OrderList.scss'; 
import { FaUser, FaAward, FaTools, FaBoxOpen, FaHeadset, FaFileAlt, FaInfoCircle, FaHome } from 'react-icons/fa';
import Footer from '../Page/Footer';
import ProfileAccount from '../Account/Profile';
import { useNavigate } from 'react-router-dom';
import AccountSidebar from '../Account/Account-sidebar';
const OrderList = ({ orders }) => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

  return (
    <div>
        <div className="order-list">
        <AccountSidebar/>
      <div className="content">
        <div className="tabs">
          <button onClick={() => setFilter('all')}>Tất cả</button>
          <button onClick={() => setFilter('pending')}>Chờ xác nhận</button>
          <button onClick={() => setFilter('shipping')}>Chờ giao</button>
          <button onClick={() => setFilter('delivering')}>Đang giao</button>
          <button onClick={() => setFilter('delivered')}>Đã giao</button>
          <button onClick={() => setFilter('cancelled')}>Dừng đơn</button>
          <button onClick={() => setFilter('returned')}>Đã trả hàng</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày đặt hàng</th>
              <th>Loại đơn hàng</th>
              <th>Giá trị đơn hàng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button>&laquo;</button>
          <button>&lsaquo;</button>
          <button>&rsaquo;</button>
          <button>&raquo;</button>
        </div>
        
      </div>
      
    </div>
    <Footer/>
    </div>
    
  );
};

export default OrderList;
