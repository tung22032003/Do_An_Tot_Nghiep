import React from 'react';
import '../product-details/Carousel.scss';   

const Carousel = ({ images, onImageClick }) => {
    return (
        <div className="carousel">
          <button className="carousel-button prev">❮</button>
          <div className="carousel-images">
            {images.map((image, index) => (
              <img 
                key={index} 
                src={`data:image/jpeg;base64,${image.base64Data}`} 
                alt={`Related ${index}`} 
                onClick={() => onImageClick(image)}
                onError={(e) => e.target.style.display = 'none'}   
              />
            ))}
          </div>
          <button className="carousel-button next">❯</button>
        </div>
      );
};

export default Carousel;