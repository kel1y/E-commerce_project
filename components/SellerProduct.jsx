import React, { useState } from 'react';
import deleteProduct from '../assets/delete.png';
import edit from '../assets/edit.png';
import spinner_SVG from '../assets/spinner.svg';
import threeDots_SVG from '../assets/three-dots.svg';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleProduct } from '../redux/slices/product/productDelete';
import { updateAvailability } from '../redux/slices/product/productAvailability';

const SellerProduct = ({
  product: { id, images, productName, price, availability },
}) => {
  const dispatch = useDispatch();
  const [threeDots, setThreeDots] = useState(false);

  const handleDeleteProduct = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You're about to delete this product, this action is irreversible!",
      confirmButtonColor: '#64B937',
    }).then(() => {
      dispatch(deleteSingleProduct(id));
    });
  };

  const handleAvailability = (id) => {
    dispatch(updateAvailability(id));
  };

  return (
    <div
      className="seller-single-product-container"
      onMouseLeave={() => setThreeDots(false)}
    >
      <Link className="product_link" to={`/products/${id}`}>
        <img
          src={images[0]}
          width={250}
          height={250}
          alt=""
          className="product-image"
        />

        <p className="product-name">{productName}</p>
        <p className="product-price">RWF {price}</p>
      </Link>
      <label className="seller-product-menu">
        <img src={threeDots_SVG} onClick={() => setThreeDots(!threeDots)} />
      </label>
      <div
        className={`seller-product-availability ${
          threeDots ? 'visible' : null
        }`}
      >
        <Link
          className="seller-product-availability-button"
          onClick={() => handleAvailability(id)}
        >
          {availability
            ? 'Available(click to change)'
            : 'Not available(click to change)'}
        </Link>
      </div>
      <div className="seller_product_image_icons">
        <Link to={`/dashboard/products/${id}/update`}>
          <img src={edit} alt="edit" className="edit" />
        </Link>
        <Link to={`#`} onClick={handleDeleteProduct}>
          <img src={deleteProduct} alt="delete" className="delete" />
        </Link>
      </div>
    </div>
  );
};

export default SellerProduct;
