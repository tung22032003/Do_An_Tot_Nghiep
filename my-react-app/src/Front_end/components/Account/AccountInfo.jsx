import React from 'react';
import './AccountInfo.scss';

const AccountInfo = ({ user, onLogout }) => {
  return (
    <div className="account-info-container">
      <div className="account-balance">
        Thông tin   
      </div>
      <ul className="account-options">
        <li><i className="fas fa-award"></i> Đặc quyền thành viên</li>
        <li><i className="fas fa-concierge-bell"></i> Tiện ích, dịch vụ</li>
        <li><i className="fas fa-box"></i> Đơn hàng</li>
        <li><i className="fas fa-headset"></i> Hỗ trợ người dùng</li>
        <li><i className="fas fa-user-cog"></i> Quản lý tài khoản</li>
        <li><i className="fas fa-bell"></i> Thông báo, bài viết</li>
        <li><i className="fas fa-file-alt"></i> Quy định, chính sách</li>
        <li><i className="fas fa-store"></i> Về BabyStore </li>
      </ul>
      <div className="logout-section" onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i> Đăng xuất
      </div>
    </div>
  );
};

export default AccountInfo;
