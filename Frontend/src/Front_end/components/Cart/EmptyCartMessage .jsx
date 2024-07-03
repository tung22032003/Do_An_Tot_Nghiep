// File: src/components/EmptyCartMessage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';
import Footer from '../Page/Footer';

const EmptyCartMessage = () => {
  return (
    <div>
      <div className="empty-cart">
      <h2>GIỎ HÀNG</h2>
      <p>Bạn chưa có sản phẩm nào trong Giỏ hàng. </p>
      <p>Mua sắm thêm để nhận nhiều ưu đãi Bạn nhé.</p>
      <img src="Frame.png" alt="Empty Cart" />
      <Link to="/page" className="continue-shopping-button">TIẾP TỤC MUA SẮM</Link>
    </div>
    <Footer/>
    </div>
    
  );
};

export default EmptyCartMessage;
