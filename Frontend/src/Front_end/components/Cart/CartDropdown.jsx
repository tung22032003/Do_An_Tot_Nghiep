import React, { useState } from 'react';
import '../Cart/CartDropdown.scss';

const CartDropdown = ({ cartItems = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="cart-container" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className='cart-button'>Giỏ hàng</button>
      {isHovered && (
        <div className="cart-dropdown">
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <p>{item.name}</p>
                  <p>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Giỏ Hàng Của Bạn Đang Trống</p>
          )}
          <button>Tiếp tục mua sắm</button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
