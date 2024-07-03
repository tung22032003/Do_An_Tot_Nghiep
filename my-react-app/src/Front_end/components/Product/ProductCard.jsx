import React, {  useState } from 'react';
import '../Page/page.scss';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart  } = useCart();
  

  const handleIconClick = () => {
    setIsFavorite(!isFavorite);
    toast.success(`${product.name} ${!isFavorite ? 'đã thêm vào' : 'đã xóa khỏi'} danh sách yêu thích!`);
  };
  
  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      productId: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    addToCart({
      productId: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  
  if (!product) {
    return null;
  }

  const formattedPrice = (product.price ?? 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  const imageUrl = `data:image/jpeg;base64,${product.image}`;

  return (  
    <div className="card border p-4 rounded shadow mx-2 h-100 d-flex flex-column custom-border-radius">
      <div className="image-container mb-4">
      <Link to={`/product/${product.id}`}>
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="card-img-top w-100 h-48 object-cover"
        />
        </Link>
        <div className="discount-label">-30%</div>
      </div>
      
      <div className="product-info-wrapper">
        <div className="product-info mb-4 flex-grow-1">
          <div className='brand-category'>
            <p className="mb-4 custom-color text-end">Thương hiệu: {product.brandName}</p>
            <p className="mb-4 custom-color text-end">SKU: {product.sku}</p>
          </div>
          <h2 className="custom-size font-weight-bold mb-2">{product.name}</h2>
          <span className="text-danger custom-size mb-2">{formattedPrice}</span>
        </div>
        <div className="action-button mt-auto">
          <button 
          className="btn btn-primary text-white px-4 py-2 rounded" 
          style={{width: '200px', height: '50px', fontSize: '14px'}}
          onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
          <i 
            className={`fa-heart ${isFavorite ? 'fas' : 'far'} icon-spacing`} 
            onClick={handleIconClick}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
