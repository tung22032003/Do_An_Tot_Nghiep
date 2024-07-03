import React, { useState } from 'react';
import './sidebar.scss'
import {ProSidebar,Menu, MenuItem, SubMenu,SidebarHeader,SidebarFooter,SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link,NavLink, Navigate, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
  FaBars,
  FaCartArrowDown,
  FaFileInvoiceDollar
} from 'react-icons/fa';
import { RiNewsLine } from "react-icons/ri";
import './admin.scss';
import { DiReact } from 'react-icons/di';
import { PostLogin } from '../Service/apiService';
import { toast } from 'react-toastify';
const SidebarComponent = ({image,collapsed,toggled,handleToggleSidebar,handleCollapsedChange,isLoggedIn, onLogout}) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/login');
    }
  };
  return (
    <>
    <ProSidebar    
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
            ></MenuItem>
          ) : (
            <MenuItem
            >
              <div
                style={{
                  padding: '24px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 20,
                  letterSpacing:'1px',
                  overflow:'hidden',
                  textOverflow:'ellipsis',
                }}
              >
                <DiReact size={'1.5rem'} color={'00bfff'}/>
                <span>Admin </span>             
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
             
          >
            Thống kê
            <Link to="/doashboard" />
          </MenuItem>
          {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
          <MenuItem icon={<FaFileInvoiceDollar />}>
            Thống kê hóa đơn  
          </MenuItem>
          <SubMenu
            title={'Danh mục'}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>Quản lí Sản phẩm
              <Link to="/admin/manage-products" /> 
            </MenuItem>
            <MenuItem>Quản lí User
              <Link to="/admin/manage-users" />
            </MenuItem>
            <MenuItem>Quản lí thương hiệu
            <Link to="/admin/manage-brands" />
            </MenuItem>
            <MenuItem>Quản lí hình ảnh sản phẩm
            <Link to="/admin/manage-image" />
            </MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray"></span>}
            title={'Quản lí đơn hàng'}
            icon={<FaCartArrowDown />}
          >
            <MenuItem>Submenu 1</MenuItem>
            <MenuItem>Submenu 2</MenuItem>
            <MenuItem>Submenu 3</MenuItem>
          </SubMenu>
          <SubMenu title={'Thông báo tin tức'} icon={<RiNewsLine />}>
            <MenuItem>Submenu 1 </MenuItem>
            <MenuItem>Submenu 2 </MenuItem>
            <SubMenu title={'Submenu 3'}>
              <MenuItem>Submenu 3.1 </MenuItem>
              <MenuItem>Submenu 3.2 </MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: 'center' }}>
      <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
            {isLoggedIn ? (
              <button
                className="sidebar-btn"
                style={{ cursor: 'pointer' }}
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="sidebar-btn"
                  style={{ cursor: 'pointer' }}
                >
                  Login
                </button>
              </Link>
            )}
          </div>
      </SidebarFooter>
    </ProSidebar>
    
    </>
  );
};


export default SidebarComponent;
