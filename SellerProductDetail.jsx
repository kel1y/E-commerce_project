import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
// import { fetchSingleProduct } from '../redux/slices/sellerProducts';
import deleteProduct from '../assets/Icons/delete.svg';
import edit from '../assets/Icons/edit.svg';
import spinner from '../assets/Icons/spinner.svg';
import next_img from '../assets/Icons/next_img.svg';
import previous from '../assets/Icons/previous.svg';

import '../styles/SingleProductView.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../redux/axiosinstance';

const SellerProductDetail = () => {
  const [ProductcurrentImageIndex, setProductCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const fetchSingleProduct = async () => {
    const response = await api.get(`/products/${id}`);
    setProduct(response.data.Products[0]);
  };
  useEffect(() => {
    fetchSingleProduct();
  }, []);
  const previousImage = () => {
    setProductCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setProductCurrentImageIndex((prevIndex) =>
      prevIndex === product?.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {product ? (
        <div className="seller-product-detail-container ">
          <div className="product_image">
            <div className="image-container">
              <img
                src={previous}
                alt="previous"
                className="seller_previous"
                onClick={previousImage}
              />
              <img
                src={product?.images[ProductcurrentImageIndex]}
                alt="product"
                className="product-detail-image"
              />
              <img
                src={next_img}
                alt="next_image"
                className="seller_next_image"
                onClick={nextImage}
              />
            </div>
          </div>
          <div className="seller_product-detail-desc">
            <h2 className="seller_product_name">Name</h2>
            <p> {product.productName}</p>
            <h2 className="seller_product_price">Price</h2>
            <p>${product.price}</p>
            <h2 className="seller_product_description_title">Description</h2>

            <p className="seller_product_description">{product.description}</p>
            <h2 className="seller_product_quantity">Left in Stock</h2>
            <p className="product_quantity">{product.quantity}</p>
            <div className="seller_buttons">
              <img src={edit} alt="Heart" className="Seller_Heart" />
              <img src={deleteProduct} alt="Shop" className="Seller_Shop" />
            </div>
          </div>
        </div>
      ) : (
        <div className="product_image">
          <img
            src={spinner}
            style={{ height: '55px', marginLeft: '50px' }}
            alt="loader"
          />
        </div>
      )}
    </div>
  );
};

export default SellerProductDetail;
