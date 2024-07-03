import React, { useState } from 'react';
import '../page.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MdAttachMoney } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { IoSpeedometerOutline } from "react-icons/io5";
import CartDropdown from './CartDropdown';
import '../Cart/CartDropdown.scss';
import { Link } from 'react-router-dom';
const HeaderCart = () => {
  const [isHovered, setIsHovered] = useState(false);
    return (
        <header>
          <div className="top-bar">
            <div className="shipping-info"><MdAttachMoney style={{
              color: 'yellow',
              fontSize: '25px',
              fontWeight: 'bold' 
            } }/>Miễn phí giao hàng đơn từ 500k</div>

            <div className="shipping-info"><IoSpeedometerOutline 
            style={{
              color: 'yellow',
              fontSize: '25px'
            } }
            />Miễn phí giao hàng đơn từ 500k</div>

            <div className="store-info"><CiShop 
            style={{
              color: 'yellow',
              fontSize: '25px'
            } }
            />Hệ thống 232 cửa hàng</div>
          </div>
          <div className="main-header">
            <div className="logo"> 
              <img src={`${process.env.PUBLIC_URL}/Toy.svg.png`} alt="MyKingdom Logo" />
            </div>
            <div className="search-container">
              <input  type="text" placeholder="Nhập từ khóa để tìm kiếm..." />
              <button type="submit"><i className="fas fa-search"></i></button>
            </div>
            <div className="user-actions">
            <Link to="/track-order"><i className="fas fa-shipping-fast"></i> Theo dõi đơn hàng</Link>
            <Link to="/login"><i className="fas fa-user"></i> Đăng nhập</Link>
            <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <CartDropdown/>
          </Link>
            </div>
          </div>
          <nav className={`navigation ${isHovered ? 'hovered' : ''}`}>
            <a 
            href="#"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            
            >HÀNG MỚI</a>
            <a 
            href="#"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}>
            <img src={`${process.env.PUBLIC_URL}/flash-sale.png`} alt="Flash Sale" />
              Flash Sale</a>
            <div className="dropdown">
              <a 
              href="#"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
              >Sản Phẩm</a>
            </div>
            <div className="dropdown">
              <a 
              href="#"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
              >Giới Tính</a>
            </div>
            <div className="dropdown">
              <a 
              href="#"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
              >Độ Tuổi</a>
            </div>
            <a href="#"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            >Thương Hiệu</a>
            <a href="#"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            >Khuyến Mãi</a>
            <a href="#"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            >Cẩm Nang</a>
          </nav>
        </header>
      );
  };
  
  export default HeaderCart;