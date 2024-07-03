import { BrowserRouter as Router, Route,Routes, Navigate, useLocation } from 'react-router-dom';
import Admin from './components/sidebar/admin';
import Doashboard from './components/content/Doashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageProduct from './components/content/product/ManageProduct';
import ManageUser from './components/content/mangeUser/ManageUser';
import BrandManage from './components/content/brand/brandManage';
import Page from './Front_end/components/Page/Page';
import Cart from './Front_end/components/Cart/Cart';
import ImageManange from './components/content/imageProduct/manageImage';
import ProductDetail from './Front_end/components/Product/ProductDetail';
import Header from './Front_end/components/Page/Header';
import OrderList from './Front_end/components/Order/OrderList';
import ProfileAccount from './Front_end/components/Account/Profile';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import { CartProvider } from './Front_end/components/Cart/CartContext';
//import { AuthProvider } from './components/Auth/AuthContext';
import { UserProvider } from './Front_end/components/Account/UserContext';
import Banner from './Front_end/components/Banner/Banner';


const Layout=({ user, onLogin, onLogout })=>{
    const cartId = '1';
     const location = useLocation();

     const PrivateRoute = ({ children, role }) => {
        if (!user) {
          return <Navigate to="/login" />;
        }
        if (role && user.role !== role) {
          return <Navigate to="/page" />;
        }
        return children;
      };
      const orders = [
        { id: '12345', date: '2024-06-24', type: 'Online', value: '1,000,000 VND', status: 'pending', action: 'Chi tiết' },
        { id: '12346', date: '2024-06-23', type: 'Offline', value: '500,000 VND', status: 'delivered', action: 'Chi tiết' },
        // Add more orders as needed
      ];
    return (
        <>
         
          <UserProvider>
           
           <CartProvider >
            {!location.pathname.startsWith('/admin') && <Header user={user} onLogout={onLogout} />}
            <Routes>
                <Route
                    path="/admin"
                    element={
                      <PrivateRoute role="Admin">
                            <Admin onLogout={onLogout} />
                      </PrivateRoute>}>
                    <Route path='doashboard' element={<Doashboard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-products' element={<ManageProduct />} />
                    <Route path='manage-brands' element={<BrandManage />} />
                    <Route path='manage-image' element={<ImageManange />} />                   
                </Route>
                <Route path='login' element={<Login onLogin={onLogin} />} />
                <Route path='Register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword/>}/>
                <Route path='reset-password' element={<ResetPassword />}/>
                <Route path="page" element={<Page/>} />
                <Route path="cart" element={<Cart cartId={cartId}  />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/order" element={<OrderList orders={orders} />} />
                <Route path="/account-profile" element={<ProfileAccount />} />
                <Route path="/banner" element={<Banner/>} />
               
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover 
            />
            
        </CartProvider>
          </UserProvider> 
        
        
        </>
    )
}
export default Layout;