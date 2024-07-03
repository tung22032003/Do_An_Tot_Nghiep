import React, { useState } from 'react';
import './page.scss';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse,
    MDBInputGroup,
    MDBBtn,
    MDBBtnGroup
  } from 'mdb-react-ui-kit';
const Navbar = () => {
    const [openNavSecond, setOpenNavSecond] = useState(false);
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid style={{ backgroundColor: 'hsl(0, 0%, 90%)' }} >
        <MDBNavbarBrand href='#'>
            <img src="/Logo.png" alt="Baby Store" style={{ height: '125px',borderRadius: '50%' }} />
            </MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavSecond(false)}>
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavSecond}>
        <MDBNavbarNav className='me-auto mb-3 mb-lg-0'>
              <MDBNavbarItem className='active' style={{ margin: '0 20px',fontSize:'20px',fontFamily: 'Roboto, sans-serif' }}>
                <MDBNavbarLink aria-current='page' href='#'>
                  Thương Hiệu
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px',fontSize:'20px',fontFamily: 'Roboto, sans-serif' }}>
                <MDBNavbarLink href='#'>Khuyến Mãi</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px',fontSize:'20px',fontFamily: 'Roboto, sans-serif' }}>
                <MDBNavbarLink href='#'>Sản phẩm</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem style={{ margin: '0 15px',fontSize:'20px',fontFamily: 'Roboto, sans-serif' }}>
                <MDBNavbarLink href='#'>Flash Sale</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
        </MDBCollapse>      
      <MDBBtn className='me-5' color='success'>
      <i className="fas fa-location-dot me-2"></i>
        Theo dõi đơn hàng
      </MDBBtn>
      <MDBBtn 
      className='me-1'
      >
        <MDBIcon fas icon="sign-in-alt" className='me-2' />
        Đăng Nhập
      </MDBBtn>
      <MDBBtn className='me-1' color='info'><MDBIcon fas icon="shopping-cart" className='me-2' />
        Giỏ hàng
      </MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
