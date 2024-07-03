// src/services/cartService.js
import axios from 'axios';

const API_URL = 'https://localhost:7061/api/Carts'; 

export const getCart = async (cartId) => {
    try {
        const response = await axios.get(`${API_URL}/${cartId}`);
        console.log('API response:', response); // Ghi nhật ký phản hồi từ API
        return response.data;
    } catch (error) {
        if (error.response) {
            // Lỗi phản hồi từ máy chủ
            console.error('API response error:', error.response.data);
        } else if (error.request) {
            // Lỗi trong quá trình gửi yêu cầu
            console.error('API request error:', error.request);
        } else {
            // Các lỗi khác
            console.error('Error:', error.message);
        }
        throw error; 
    }
};

export const addToCart = async (cartId, productId, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/items/${cartId}`, { productId, quantity });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('API response error:', error.response.data);
      } else if (error.request) {
        console.error('API request error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      throw error;
    }
  };

export const updateCartItem = async (cartId, productId, quantity, unitPrice) => {
    try {
        const response = await axios.put(`${API_URL}/items/${cartId}/${productId}`, { productId, quantity, unitPrice });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('API response error:', error.response.data);
        } else if (error.request) {
            console.error('API request error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};

export const removeFromCart = async (cartId, productId) => {
    try {
        const response = await axios.delete(`${API_URL}/items/${cartId}/${productId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('API response error:', error.response.data);
        } else if (error.request) {
            console.error('API request error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};

export const checkout = async (cartId, checkoutDto) => {
    try {
        const response = await axios.post(`${API_URL}/checkout/${cartId}`, checkoutDto);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('API response error:', error.response.data);
        } else if (error.request) {
            console.error('API request error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};
