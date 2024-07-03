
import React from 'react';
import '../Cart/Cart.scss';

const SummaryCart = ({ totalPrice }) => {
  return (
    <div className="SummaryCart">
      <div className="Address">
        <h4>Địa Chỉ Nhận Hàng</h4>
        <button className="AddressButton">Xác định địa chỉ nhận hàng</button>
      </div>
      <div className="Coupons">
        <h4>Ưu đãi & mã giảm giá</h4>
        <button className="CouponsButton">Bấm vào để Chọn hoặc Nhập Mã ưu đãi</button>
      </div>
      <div className="Summary">
        <p>Tạm tính: <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
        <p>Tiền tích lũy: <span>+{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
        <p>Tổng tiền: <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
        <button className="CheckoutButton">ĐĂNG NHẬP NGAY ĐỂ MUA HÀNG</button>
      </div>
    </div>
  );
};

export default SummaryCart;
