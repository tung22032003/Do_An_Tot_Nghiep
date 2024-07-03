import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import { PostResetPassword } from '../Service/apiService';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setEmail(query.get('email') || '');
    setToken(decodeURIComponent(query.get('token')) || ''); // Giải mã token
  }, [location.search]);

  const validateInputs = () => {
    if (!password || !confirmPassword) {
      toast.error("Vui lòng nhập mật khẩu và xác nhận mật khẩu!");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      return false;
    }
    if (!email || !token) {
      toast.error("Yêu cầu không hợp lệ.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      let res = await PostResetPassword(email, token, password);
      if (res.data) {
        toast.success('Mật khẩu của bạn đã được đặt lại thành công.');
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error('Có lỗi xảy ra trong quá trình đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Đặt lại mật khẩu</h2>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Mật khẩu mới'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Xác nhận mật khẩu'
                  type='password'
                  size="lg"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <MDBBtn
                  size='lg'
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Đặt lại mật khẩu'}
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ResetPassword;
