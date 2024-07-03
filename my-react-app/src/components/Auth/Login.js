import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import debounce from 'lodash.debounce';
import { useCart } from '../../Front_end/components/Cart/CartContext';
import { useAuth } from './AuthContext';
import UserContext from '../../Front_end/components/Account/UserContext';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { syncUserCart } = useCart();
  const { login: setUser, user, loading: userLoading, authError } = useContext(UserContext);

  useEffect(() => {
    if (!userLoading && user) {
      navigate('/page');
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    if (attempts >= 5) {
      toast.error('Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.');
    }
  }, [attempts]);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  const validateInputs = () => {
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin đăng nhập!");
      return false;
    }
    return true;
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const SubmitLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const res = await login(username, password);
      console.log('API response:', res);

      if (!res || !res.token || !res.refreshToken || !res.userDto) {
        throw new Error('Invalid token received');
      }

      const userDto = res.userDto;
      const token = res.token;
      const refreshToken = res.refreshToken;
      const role = res.role; // Lấy role từ phản hồi API
      console.log('Token:', token);
      console.log('Refresh Token:', refreshToken);
      console.log('Name:', username);
      console.log('Role:', role);

      toast.success('Đăng nhập thành công');
      setUser(userDto);

      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('name', username);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('name', username);
      }

      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (cartItems.length > 0) {
        await syncUserCart(cartItems);
        localStorage.removeItem('cartItems');
      }

      if (role === 'User') {
        navigate('/page');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAttempts(attempts + 1);
      toast.error('Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSubmitLogin = useCallback(debounce(SubmitLogin, 300), [username, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    debouncedSubmitLogin();
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Đăng nhập</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='username'
                  type='text'
                  size="lg"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  size="lg"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <MDBCheckbox name='showPassword' id='showPassword' className='mb-4' label='Show password' onChange={handlePasswordVisibility} />
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <MDBBtn
                  size='lg'
                  type="submit"
                  disabled={loading || attempts >= 3}
                >
                  {loading ? 'Loading...' : 'Login'}
                </MDBBtn>
              </form>
              <hr className="my-4" />
              <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#9FA6B2' }}>
                <MDBIcon fas icon="user-plus" className="mx-2" />
                <Link to="/Register" className='text-white'>
                  Đăng ký tài khoản tại đây
                </Link>
              </MDBBtn>
              <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#6c757d' }}/>
                <MDBIcon fas icon="unlock-alt" className="mx-2" />
                <Link to="/forgot-password" className='text-white'>
                  Quên mật khẩu
                </Link>
              </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
