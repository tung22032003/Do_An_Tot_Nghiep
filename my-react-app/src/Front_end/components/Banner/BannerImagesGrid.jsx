import React from 'react';
import './BannerImagesGrid.css';

const BannerImagesGrid = () => {
  const images = [
    { src: '/banner_01.webp', alt: 'Đồ Chơi Mầm Non', label: 'Đồ Chơi Mầm Non' },
    { src: '/banner_02.webp', alt: 'Mô Hình Nhân Vật', label: 'Mô Hình Nhân Vật' },
    { src: '/banner_03.webp', alt: 'Đồ Chơi Lắp Ghép', label: 'Đồ Chơi Lắp Ghép' },
  ];

  return (
    <div className="banner-images-grid">
      {images.map((image, index) => (
        <div key={index} className="banner-image-item">
          <img src={image.src} alt={image.alt} />
          <div className="image-label">{image.label}</div>
        </div>
      ))}
    </div>
  );
};

export default BannerImagesGrid;
