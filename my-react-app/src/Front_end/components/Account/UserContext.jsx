import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('Token retrieved from storage:', token);
    if (token) {
      // Gọi API để xác thực token và lấy lại thông tin người dùng
      axios.get('https://localhost:7061/api/Users/GetUserInfo', { 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          const userData = response.data;
          setUser(userData);
          console.log('User data retrieved from API:', userData);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          if (error.response && error.response.status === 401) {
            setAuthError('Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.');
            console.log('Token is invalid or expired.');
          }
           
        }).finally(() => {
          setLoading(false);
        });
      } else {
        console.log('No token found in storage.');
        setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('refreshToken', userData.refreshToken);
    console.log("Login - token and userId set in localStorage");
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userId');
    console.log("Logout - token and userId removed from storage");
  };
  return (
    <UserContext.Provider value={{ user, login, logout,loading,authError }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
