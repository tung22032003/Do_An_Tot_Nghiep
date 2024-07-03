import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
const Footer = () => {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                TÊN CÔNG TY
              </h6>
              <p>
                Trường Cao Đẳng Kỹ Thuật Cao Thắng.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>HỖ TRỢ KHÁCH HÀNG</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Hotline miễn phí:0333839162
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Chính sách CSKH
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Hướng dẫn đổi quà 
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Đổi hàng & Hoàn tiền
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Chính sách bảo hành
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>HỆ THỐNG TIỆN ÍCH</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Kiểm tra đơn hàng
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Phương thức thanh toán
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Chính sách bảo mật
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Giúp đỡ khách hàng
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Liên hệ</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Thành Phố Hồ Chí Minh,Quận 1
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
               0306211422@caothang.edu.vn
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> +84 333839162
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> +84 333839162
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      Công ty cổ phần Việt Tinh Anh Số ĐKKD: 0309132354 do sở kế hoạch và đầu tư cấp ngày 14/07/09

Địa chỉ: 33-35 đường số D4, khu Đô thị mới Him Lam, Phường Tân Hưng, Quận 7, TP. Hồ Chí Minh Điện thoại: 0286.2638.600
        
      </div>
    </MDBFooter>
  );
};

export default Footer;
