import React from "react";
import { FaAward, FaBoxOpen, FaFileAlt, FaHeadset, FaHome, FaInfoCircle, FaTools, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountSidebar=()=>{
    const navigate=useNavigate();
    return(
        <div className="sidebar">
        <p>Xin chào, +843*****162</p>
        <button className="customer-id-button">Mã khách hàng thân thiết</button>
        
        <ul>
          <li  >
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
    );
}
export default AccountSidebar;