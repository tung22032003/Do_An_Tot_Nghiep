import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../Cart/cartApi';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId] = useState(1);


  useEffect(() => {
    fetchCart(cartId);
  }, [cartId]);

  const fetchCart = async (id) => {
    try {
      const data = await getCart(id);
      setCart(data);
      console.log('Fetched cart:', data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const addToCartHandler = async (product) => {
    try {
      if (product.quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }
      const data = await addToCart(cartId, product.productId, product.quantity);
      setCart(prevCart => [...prevCart, data]);
      console.log('Updated cart:', cart);  // Kiểm tra trạng thái giỏ hàng
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error(`Failed to add to cart: ${error.message}`);
    }
  };

  const updateItemInCartHandler = async (cartId, productId, quantity, unitPrice) => {
    try {
      const data = await updateCartItem(cartId, productId, quantity, unitPrice);
      const updatedCart = cart.map(item => item.productId === productId ? data : item);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update item in cart:', error);
    }
  };

  const removeFromCartHandler = async (productId) => {
    try {
      await removeFromCart(cartId, productId);
      const updatedCart = cart.filter(item => item.productId !== productId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateItemLocally = (productId, quantity, unitPrice) => {
    const updatedCart = cart.map(item => item.productId === productId ? { ...item, quantity, unitPrice } : item);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartId,
      fetchCart,
      addToCart: addToCartHandler,
      updateItemInCart: updateItemInCartHandler,
      updateItemLocally,
      removeFromCart: removeFromCartHandler
    }}>
      {children}
    </CartContext.Provider>
  );
};
