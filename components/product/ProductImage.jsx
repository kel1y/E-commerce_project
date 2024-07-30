import React from 'react';
import close_SVG from '../../assets/close_square.png';
import '../../styles/productUpdate.css';

export const ProductImage = ({ url, index,fileName, handleImageRemoval }) => {
  return (
    <div className="product-update-image-container">
      <img src={url} alt={`preview-${index}`} />;
      <img
        src={close_SVG}
        className="image-del-button"
        alt="remove image"
        onClick={handleImageRemoval(fileName)}
      />
    </div>
  );
};
