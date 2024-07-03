// File: src/components/Account.js
import React from 'react';
import { FaUser, FaAward, FaTools, FaBoxOpen, FaHeadset, FaFileAlt, FaInfoCircle, FaHome, FaEdit, FaTrash } from 'react-icons/fa';
import './Profile.scss';  
import { useNavigate } from 'react-router-dom';
import AccountSidebar from './Account-sidebar';

const ProfileAccount = () => {
    const navigate = useNavigate();
  return (
    <div className="account-profile">
       
       <div className="sidebar">
        <p>Xin chào, +843*****162</p>
        <button className="customer-id-button">Mã khách hàng thân thiết</button>
         
        <ul>
          <li className="active">
          <button onClick={() => navigate('/account-profile')}>
                <FaUser /> Tài khoản
              </button>
          </li>
          <li>
            <button onClick={() => alert('Đặc quyền thành viên')}>
              <FaAward /> Đặc quyền thành viên
            </button>
          </li>
          <li>
            <button onClick={() => alert('Tiện ích, dịch vụ')}>
              <FaTools /> Tiện ích, dịch vụ
            </button>
          </li>
          <li >
            <button onClick={() => navigate('/order')}>
              <FaBoxOpen /> Đơn hàng
            </button>
          </li>
          <li>
            <button onClick={() => alert('Hỗ trợ người dùng')}>
              <FaHeadset /> Hỗ trợ người dùng
            </button>
          </li>
          <li>
            <button onClick={() => alert('Quy định, chính sách')}>
              <FaFileAlt /> Quy định, chính sách
            </button>
          </li>
          <li>
            <button onClick={() => alert('Thông báo, bài viết')}>
              <FaInfoCircle /> Thông báo, bài viết
            </button>
          </li>
          <li>
            <button onClick={() => alert('Về Bibo Mart')}>
              <FaHome /> Về Bibo Mart
            </button>
          </li>
        </ul>
      </div>
      <div className="content-profile">
        <div className="personal-info">
          <h2>Thông tin cá nhân</h2>
          <p>Họ và tên: +843*****162</p>
          <p>Ngày tháng năm sinh: chưa có</p>
          <p>Số điện thoại: +84333839162</p>
          <p>Giới tính: Nữ</p>
          <p>Email: chưa có</p>
        </div>
        <div className="child-info">
          <h2>Thông tin bé yêu</h2>
          <p>Thêm chính xác thông tin con để nhận quà tặng đặc biệt từ Bibo trong ngày sinh nhật của bé.</p>
          <a href="#">Cập nhật thông tin</a>
        </div>
        <div className="address-info">
          <h2>Địa chỉ giao hàng</h2>
          <div className="address-item">
            <p>+843*****162</p>
            <p>Ấp mới 1, Xã Mỹ Hạnh Nam, Huyện Đức Hòa, Long An</p>
            <p>+84333839162</p>
            <span className="address-type">Nhà riêng</span>
            <label>
              <input type="checkbox" checked /> Địa chỉ mặc định
            </label>
            <div className="address-actions">
              <FaEdit className="icon" />
              <FaTrash className="icon" />
            </div>
          </div>
          <button className="add-address-button">Thêm địa chỉ mới</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAccount;
