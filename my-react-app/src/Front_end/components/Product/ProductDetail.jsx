import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Product/product-detail.scss';
import Breadcrumb from '../Page/Breadcrumb';
import Carousel from '../product-details/Carousel';
import RelatedProducts from '../product-details/RelatedProducts ';
import Footer from '../Page/Footer';
import '../Page/Footer.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const [relatedImages, setRelatedImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const breadcrumbItems = [
    { label: 'Trang Chủ', link: '' },
    { label: 'Chi tiết sản phẩm' }
];
  useEffect(() => {
    axios.get(`https://localhost:7061/api/Products/${id}`)
      .then(response => {
        setProduct(response.data);
        setCurrentImage(response.data.image);
        return axios.get(`https://localhost:7061/api/ImageProducts/product/${id}`);
      })
      .then(response => {
        setRelatedImages(response.data);
        return axios.get('https://localhost:7061/api/Products/product-all');
      })
      .then(response => {
        const allProducts = response.data;
        const limitedProducts = allProducts.slice(0,5); // Lấy 10 sản phẩm đầu tiên
        setRelatedProducts(limitedProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);
  if (!product) {
    return <div>Loading...</div>;
  }

  const formattedPrice = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  //const imageUrl = `data:image/jpeg;base64,${product.image}`;
  const imageUrl = `data:image/jpeg;base64,${currentImage}`;
  const handleImageClick = (image) => {
    setCurrentImage(image.base64Data);
  };
  return (
    <div className='product-detail-container'>
      <div className='header-product-detail'>  
      </div>
      <div className="page-width">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      <div className="product-detail">
        <div className="image-detail">
          <div className="image-detail-container">
            <img src={imageUrl} alt={product.name} className="product-img" />
        </div>
        <Carousel images={relatedImages} onImageClick={handleImageClick} />
        </div>
      
         
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="brand-sku">
            <span>Thương hiệu <a href="#">{product.brandName}</a></span>
            <span>SKU {product.sku}</span>
          </div>
          <div className="prices">
            <div className="price-member">
              <span>Giá thành viên</span>
              <span className="current-price">{formattedPrice}</span>
              {formattedPrice && <span className="original-price">{formattedPrice}</span>}
            </div>
            <div className="price-sale">
              <span>Giá bán</span>
              <span className="current-price">{formattedPrice}</span>
              {formattedPrice && <span className="original-price">{formattedPrice}</span>}
            </div>
          </div>
          <div className="benefits">
            <span>✔ Hàng Chính Hãng</span>
            <span>✔ Miễn Phí Giao Hàng Toàn Quốc Đơn Trên 500k</span>
            <span>✔ Giao Hàng Hỏa Tốc 4 Tiếng</span>
          </div>
          <div className="quantity-cart">
            <div className="quantity">
              <label>Số lượng:</label>
              <div className="quantity-input">
                <button>-</button>
                <input type="number" min="1" defaultValue="1" />
                <button>+</button>
              </div>
            </div>
            <button className="btn btn-primary">Thêm Vào Giỏ Hàng</button>
          </div>
          <div className="product-description">
            <h2>Thông tin sản phẩm</h2>
            <table>
              <tbody>
                <tr>
                  <td>Chủ đề</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Xuất xứ</td>
                  <td>Thái Lan</td>
                </tr>
                <tr>
                  <td>Mã VT</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Tuổi</td>
                  <td>3 tuổi trở lên</td>
                </tr>
                <tr>
                  <td>Thương hiệu</td>
                  <td>HOT WHEELS</td>
                </tr>
                <tr>
                  <td>Xuất xứ thương hiệu</td>
                  <td>MATTEL</td>
                </tr>
              </tbody>
            </table>
            <a href="#" className="more-info">Xem thêm</a>
          </div>
          </div>
        
      </div>
      <RelatedProducts products={relatedProducts} />
      <div className='footer-product-detail'>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
