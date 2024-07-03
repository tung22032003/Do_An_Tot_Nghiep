import React from 'react';
import './Arrow.css';

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-next-arrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

export default CustomNextArrow;
