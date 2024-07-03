import React from 'react';
import './BannerButtons.css';

const BannerButtons = () => {
  return (
    <div className="banner-buttons">
      <button className="banner-button">Tất Cả</button>
      <button className="banner-button">Hàng Mới</button>
      <button className="banner-button">Sự Kiện</button>
      <button className="banner-button">Giảm Giá</button>
    </div>
  );
};

export default BannerButtons;
