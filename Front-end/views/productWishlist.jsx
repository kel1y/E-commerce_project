/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import spinner from '../assets/spinner.svg';
import { getAllProductWishes, addProductToWishlist} from '../redux/slices/productWishlist/getProductFromWishlist';
import Heart from '../assets/Icons/Heart2.svg';
import Shop from '../assets/Icons/shop1.svg';
import wishlistImage from '../assets/wishlistImage.svg';
import '../styles/productWishlist.css';
// import { addProductToWishlist } from '../redux/slices/productWishlist/AddProductToWishlist';
import { addCart } from '../redux/slices/cart/addCart';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading,loadingAddOrRemove } = useSelector(
    (state) => state.getAllProductWishes
  );

  useEffect(() => {
    dispatch(getAllProductWishes());
    window.scrollTo(0, 0);
  }, []);

  const handleAddCart = (itemId) => {
    dispatch(addCart(itemId));
  };

  const handleRemoveFromWishlist = (itemId) => {
    if(loadingAddOrRemove) return;
    dispatch(addProductToWishlist({ product_id: itemId }));
  };

  return (
    <div className="wishlist-container" data-testid="wishlist-container">
      <div className="wishlist-title">
        <p className="wishlist-name">My Wishlist</p>
      </div>
      <div className="wishlist-products-container">
        {loading ? (
          <img
            className="wishlist-loader"
            src={spinner}
            style={{ height: '55px' }}
            alt="loader"
          />
        ) : wishlist && wishlist?.length > 0 ? (
          <div>
            <div className="wishlist-map">
              {wishlist?.map((product) => (
                <div className="wishlist-card" key={product.id}>
                  <div className="productWish_image_icons">
                    <img
                      src={Heart}
                      alt="Heart"
                      className="HeartWish"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    />

                    <img
                      src={Shop}
                      alt="Shop"
                      className="Shop"
                      onClick={() => handleAddCart(product.id)}
                    />
                  </div>
                  <div className="product-card">
                    <img
                      src={product.images[0]}
                      width={250}
                      height={250}
                      alt=""
                      className="product-image"
                    />

                    <p className="product-name">{product.productName}</p>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-wishlist-container">
            <div className="wishlist-image">
              <img
                src={wishlistImage}
                alt="wishlist"
                className="wishlist-icon-cart"
              />
            </div>
            <div className="wishlist-message-container">
              <p className="wishlist-message">Your Wishlist is Empty</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
