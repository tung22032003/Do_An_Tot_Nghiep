import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://localhost:7061/api/Users');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://localhost:7061/api/Users/login', { username, password });
  
      // Kiểm tra xem phản hồi có tồn tại và có chứa data hay không
      if (!response || !response.data) {
        throw new Error('No response or data received from API');
      }
  
      const { token, refreshToken, userDto } = response.data.value;
  
      // Kiểm tra xem token, refreshToken và userDto có giá trị hay không
      if (token && refreshToken && userDto) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userDto);
        setToken(token);
        setRefreshToken(refreshToken);
  
        // Lấy dữ liệu role từ đối tượng userDto
        const role = userDto.role;
  
        return { ...response.data.value, role };
      } else {
        console.log('Received response:', response.data); // Ghi log để kiểm tra phản hồi
        throw new Error('Invalid token received');
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
    setRefreshToken(null);
  };

  const refreshAuthToken = async () => {
    try {
      const response = await axios.post('https://localhost:7061/api/Users/refresh-token', { token: refreshToken });
      const { token: newToken } = response.data;
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);
    } catch (error) {
      console.error('Token refresh failed', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
