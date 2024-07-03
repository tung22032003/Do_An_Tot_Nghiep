import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import './Cart.scss';
import SummaryCart from './SummaryCart';
import Footer from '../Page/Footer';

import EmptyCartMessage from './EmptyCartMessage ';
import { useCart } from './CartContext';

const LoadingMessage = ({ children }) => {
  return <div className="LoadingMessage">{children}</div>;
};

const Cart = () => {
  const { cart, cartId, fetchCart, updateItemInCart, updateItemLocally, removeFromCart } = useCart();
  
  useEffect(() => {
    if (cartId) {
      fetchCart(cartId);
    }
  }, [cartId, fetchCart]);

  useEffect(() => {
    console.log('Cart ID:', cartId);  // Kiểm tra cartId
    console.log('Cart:', cart);  // Kiểm tra trạng thái giỏ hàng
  }, [cart, cartId]);
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  };

  if (!cart) {
    return <LoadingMessage>Đang tải...</LoadingMessage>;
  }

  if (cart.length === 0) {
    return <EmptyCartMessage />;
  }

  const handleIncreaseQuantity = async (itemId) => {
    try {
      const cartItem = cart.find(item => item.id === itemId);
      if (!cartItem) {
        throw new Error('Không tìm thấy sản phẩm trong giỏ hàng');
      }
      const newQuantity = cartItem.quantity + 1;
      const newPrice = (cartItem.unitPrice / cartItem.quantity) * newQuantity;

      await updateItemInCart(cartId, cartItem.productId, newQuantity, newPrice);
      updateItemLocally(cartItem.productId, newQuantity, newPrice);
    } catch (error) {
      toast.error(`Lỗi khi cập nhật số lượng: ${error.message}`);
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      const cartItem = cart.find(item => item.id === itemId);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }
      const newQuantity = cartItem.quantity - 1;
      if (newQuantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      const newPrice = (cartItem.unitPrice / cartItem.quantity) * newQuantity;
  
      await updateItemInCart(cartId, cartItem.productId, newQuantity, newPrice);
      updateItemLocally(cartItem.productId, newQuantity, newPrice);
    } catch (error) {
      toast.error(`Lỗi khi cập nhật số lượng: ${error.message}`);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const cartItem = cart.find(item => item.id === itemId);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      await removeFromCart(cartItem.productId);
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng.');
    } catch (error) {
      toast.error(`Lỗi khi xóa sản phẩm: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="CartContainer">
        <div className="CartItems">
          <div className="CartHeader">
            <span>Sản phẩm</span>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
          </div>
          <ul className="CartList">
            {cart.map(item => (
              <li key={item.id} className="CartItem">
                <div className="ItemDetails">
                  {item.image ? (
                    <img
                      className="ItemImage"
                      src={`data:image/png;base64,${item.image}`}
                      alt={item.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100"; }}
                    />
                  ) : (
                    <p>Không có hình ảnh</p>
                  )}
                  <div className="ItemInfo">
                    <h3 className="ItemName">{item.name}</h3>
                  </div>
                </div>
                <div className="ItemPrice">
                  {(item.unitPrice ?? 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </div>
                <div className="ItemQuantity">
                  <button className="Button" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="Button" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                </div>
                <div className="ItemTotalPrice">
                  {(item.unitPrice * item.quantity ?? 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </div>
                <div className="ItemActions">
                  <button className="RemoveButton" onClick={() => handleRemoveItem(item.id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SummaryCart totalPrice={calculateTotalPrice()} />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
