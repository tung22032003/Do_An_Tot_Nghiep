import React from 'react';
import '../product-details/RelatedProducts.scss';
import ProductCard from '../Product/ProductCard';

const RelatedProducts = ({ products }) => {
  const limitedProducts = products.slice(0, 5);

  return (
    <div className="related-products">
      <h2>Sản phẩm liên quan</h2>
      <div className="related-products-list">
        {limitedProducts.map(product => (
          <div key={product.id} className="related-product-item">
            <a href={`/product/${product.id}`}>
              <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="related-product-img" />
              <div className="related-product-info">
                <h3>{product.name}</h3>
                <span className="related-product-price">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
            </a>
            <div className="related-product-actions">
              <button className="btn btn-primary related-product-button">Thêm vào giỏ hàng</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
