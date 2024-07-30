/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useGetSingleProductQuery } from '../redux/slices/products';
import Heart from '../assets/Icons/Heart2.svg';
import Shop from '../assets/Icons/shop1.svg';
import next_img from '../assets/Icons/next_img.svg';
import previous from '../assets/Icons/previous.svg';
import { addCart } from '../redux/slices/cart/addCart';

import '../styles/SingleProductView.css';
import Reviews from './Reviews';
import { addProductToWishlist } from '../redux/slices/productWishlist/AddProductToWishlist';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, error, data } = useGetSingleProductQuery(id);
  if (!isLoading && !data.Products) {
    return (
      <div className="product-detail-container">
        <h2> 404🙈Product Not Found</h2>
      </div>
    );
  }
  const product = data.Products[0];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleAddCart = (itemId) => {
    dispatch(addCart(itemId));
  };  const handleAddProductToWishlist = (itemId) => {
    dispatch(addProductToWishlist({ product_id: itemId }));
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product_image">
          <div className="image-container">
            <img
              src={previous}
              alt="previous"
              className="previous"
              onClick={previousImage}
            />
            <img
              src={product.images[currentImageIndex]}
              alt="product"
              className="product-detail-image"
            />
            <img
              src={next_img}
              alt="next_image"
              className="next_image"
              onClick={nextImage}
            />
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{product.productName}</h1>
          <p className="product_description">{product.description}</p>
          <div className="buttons">
            <p className="product_price">RWF{product.price}</p>
            <div className="buttons-img">
              <img 
              src={Heart} 
              alt="Heart" 
              className="Heart-Single" 
              onClick={() => handleAddProductToWishlist(id)}
              />
              <img
                src={Shop}
                alt="Shop"
                className="Shop-Single"
                onClick={() => handleAddCart(product.id)}
              />
            </div>
          </div>
          <div className="small-images-container">
            <img
              src={product.images[1]}
              alt="image1"
              className="small-image selected-image"
            />
            <img
              src={product.images[2]}
              alt="image2"
              className="small-image selected-image"
            />
            <img
              src={product.images[3]}
              alt="image3"
              className="small-image selected-image"
            />
          </div>
        </div>
      </div>
      {/* <Reviews /> */}
    </div>
  );
};

export default ProductDetail;
