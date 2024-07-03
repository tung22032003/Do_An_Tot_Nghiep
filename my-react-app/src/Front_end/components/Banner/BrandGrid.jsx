import React from 'react';
import './BrandGrid.css';

const brands = [
  { src: '/Brand/brand01.webp', alt: 'LEGO' },
  { src: '/Brand/brand02.png', alt: 'Clever Hippo' },
  { src: '/Brand/brand03.png', alt: 'Peek A Boo' },
  { src: '/Brand/brand04.webp', alt: 'Vecto' },
  { src: '/Brand/brand05.png', alt: 'Siku' },
  { src: '/Brand/brand06.png', alt: 'Hot Wheels' },
  { src: '/Brand/brand07.png', alt: 'Beyblade' },
  { src: '/Brand/brand08.webp', alt: 'Rastar' }
];

const BrandGrid = () => {
  return (
    <div className="brand-grid">
      <h2>Thương Hiệu Nổi Bật</h2>
      <div className="brand-images-grid">
        {brands.map((brand, index) => (
          <div key={index} className="brand-image-item">
            <img src={brand.src} alt={brand.alt} />
          </div>
        ))}
      </div>
      <button className="view-all-brands">Tất Cả Thương Hiệu</button>
    </div>
  );
};

export default BrandGrid;
