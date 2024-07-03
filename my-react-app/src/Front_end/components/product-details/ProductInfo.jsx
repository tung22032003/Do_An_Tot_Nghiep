import React from 'react';
import '../product-details/product.scss';
const ProductInfo = ({ product }) => (
  <div className="product-info">
    <h1>{product.name}</h1>
    <p>{product.description}</p>
    <div className="price">{product.price}</div>
    <button>Add to Cart</button>
  </div>
);

export default ProductInfo;