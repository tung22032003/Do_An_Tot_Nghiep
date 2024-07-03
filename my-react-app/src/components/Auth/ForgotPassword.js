import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { PostForgotPassword } from '../Service/apiService';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email) {
      toast.error("Vui lòng nhập email!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      let res = await PostForgotPassword(email);
      if (res.data) {
        toast.success('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.');
        navigate('/reset-password', { state: { email, token: res.data.token } });
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
      toast.error('Có lỗi xảy ra trong quá trình gửi yêu cầu. Vui lòng thử lại sau.');
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
              <h2 className="fw-bold mb-2 text-center">Quên mật khẩu</h2>
              <p className="text-white-50 mb-3">Vui lòng nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.</p>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Email'
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <MDBBtn
                  size='lg'
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Gửi yêu cầu'}
                </MDBBtn>
              </form>
              <hr className="my-4" />
              <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#9FA6B2' }}>
                <MDBIcon fas icon="arrow-left" className="mx-2" />
                <Link to="/login" className='text-white'>
                  Quay lại trang đăng nhập
                </Link>
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ForgotPassword;
