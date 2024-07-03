import React from 'react';
import './Arrow.css';

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

export default CustomPrevArrow;
