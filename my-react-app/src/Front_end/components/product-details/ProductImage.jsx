import React from 'react';
import '../product-details/product.scss';
const ProductImage = ({ image }) => (
  <div className="product-image">
    <img src={image} alt="Product" />
  </div>
);

export default ProductImage;