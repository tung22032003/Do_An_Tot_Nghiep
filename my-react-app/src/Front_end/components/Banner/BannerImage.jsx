import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BannerImage.css';
import CustomPrevArrow from './CustomPrevArrow';
import CustomNextArrow from './CustomNextArrow';

const BannerImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const images = [
    '/banner1.webp', // Đường dẫn ảnh cần được cập nhật đúng
    '/banner2.webp',
    '/banner3.webp' // Đường dẫn ảnh cần được cập nhật đúng
  ];

  return (
    <Slider {...settings}>
      {images.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Banner ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default BannerImage;
