import React from 'react';

const BannerContent = () => {
  return (
    <div className="banner-text">
      <h1>Độc Quyền Website</h1>
      <h2>Sắm Ngay Deal Xịn</h2>
      <div className="promotions">
        <div className="promo-item">Giảm đến <strong>40%</strong></div>
        <div className="promo-item">Đơn từ <strong>500K</strong> Free Ship</div>
        <div className="promo-item">Giao Hàng Hỏa Tốc <strong>4H</strong></div>
      </div>
      <button className="buy-now">Mua Ngay</button>
    </div>
  );
};

export default BannerContent;
