import React from 'react';
import './Banner.css';
import BannerImage from './BannerImage';
import BannerButtons from './BannerButtons';
import BannerImagesGrid from './BannerImagesGrid';
import BrandGrid from './BrandGrid';
import TopProducts from './TopProducts';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-image">
        <BannerImage />
      </div>
      <BannerButtons />
      <div className="banner-images-wrapper">
        <BannerImagesGrid />
      </div>
      <div className='brand-Grid'>
        <BrandGrid/>
      </div>
      <div className='top-product'>
        <TopProducts/>
      </div>
    </div>
  );
};

export default Banner;
