import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Layout from './Layout';
import 'nprogress/nprogress.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user data", error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  return (
    <>
      <Router>
            <Layout
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout} 
            />
      </Router>
    </>
  );
};

export default App;
