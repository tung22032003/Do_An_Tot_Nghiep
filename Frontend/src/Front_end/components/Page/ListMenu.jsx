import React from 'react';
import { MDBBtn, MDBContainer, MDBInputGroup, MDBNavbar } from 'mdb-react-ui-kit';
import './page.scss';
const ListMenu=()=>{
    return(
        <MDBNavbar light bgColor='light'>
      <MDBContainer className='navbar-search'>
        <MDBInputGroup tag="form" className='d-flex w-100 mb-3'>
          <input className='form-control' placeholder="Nhập từ khóa để tìm kiếm" aria-label="Search" type='Search' />
          <MDBBtn outline>Tìm sản phẩm</MDBBtn>
        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>
    );
}
export default ListMenu;