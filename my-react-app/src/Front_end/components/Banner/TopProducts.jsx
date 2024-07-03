import React from 'react';
import './TopProducts.css';

const products = [
  {
    imgSrc: '/Product/product01.webp',
    name: 'ROBOT SIÊU ANH HÙNG WORLD GAMES HERO',
    brand: 'ROBOT',
    sku: 'BMO106-PINK',
    oldPrice: '510.000đ',
    newPrice: '415.000đ',
    discount: '-20%',
  },
  {
    imgSrc: '/Product/product02.webp',
    name: 'ROBOT CAM MEGATROL POWER RANGER V1',
    brand: 'LEGO CLASSIC',
    sku: '10698',
    oldPrice: '1.920.000đ',
    newPrice: '1.152.000đ',
    discount: '-40%',
  },
  {
    imgSrc: '/Product/product03.webp',
    name: 'XE ĐIỀU KHIỂN XANH CHIẾN CƠ WATERBLUE',
    brand: 'BEYBLADE',
    sku: '173748',
    oldPrice: '390.000đ',
    newPrice: '279.000đ',
    discount: '-30%',
  },
  {
    imgSrc: '/Product/product04.webp',
    name: 'BALO MARVEL SIÊU ANH HÙNG PHIÊN BẢN GIỚI HẠN V2',
    brand: 'Marvel',
    sku: 'HDY92',
    oldPrice: '1.349.000đ',
    newPrice: '944.000đ',
    discount: '-30%',
  },
];

const TopProducts = () => {
  return (
    <div className="top-products">
      <h2>Top 10 Sản Phẩm Bán Chạy</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.imgSrc} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.brand}</p>
              <p>SKU: {product.sku}</p>
              <div className="price">
                <span className="old-price">{product.oldPrice}</span>
                <span className="new-price">{product.newPrice}</span>
              </div>
              <span className="discount">{product.discount}</span>
            </div>
            <button className="add-to-cart">Thêm Vào Giỏ Hàng</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
