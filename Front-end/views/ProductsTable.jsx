import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { connect, useDispatch, useSelector } from 'react-redux';
import { deleteSingleProduct } from '../redux/slices/product/productDelete';
import { updateAvailability } from '../redux/slices/product/productAvailability';
import { Link } from 'react-router-dom';
import { Pagination } from '../components';
import { fetchSellerProducts } from '../redux/slices/sellerProducts';
import '../styles/dashboard.css';

import deleteProduct from '../assets/delete.png';
import edit from '../assets/edit.png';
import spinner from '../assets/Icons/spinner.svg';

const ProductsTable = ({
  products,
  onDeleteProduct,
  onChangeAvailability,
  isLoading,
}) => {
  const productsState = useSelector((state) => state.product);

  products = productsState.products;
  isLoading = productsState.loading;

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteProduct = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You're about to delete this product, this action is irreversible!",
      confirmButtonColor: '#64B937',
    }).then(() => {
      onDeleteProduct(id);
    });
  };
  const handleAvailability = (id) => {
    onChangeAvailability(id);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchSellerProducts({ page: currentPage, limit: 10 }));
  }, [currentPage]);
  return (
    <>
      {isLoading ? (
        <div className="products-container" data-testid="products-container">
          <img src={spinner} alt="loader" className="products-table-loader" />
        </div>
      ) : (
        <div className="products-table-container">
          <label className="products-table-title">Products</label>
          <table className="products-table">
            <thead>
              <tr>
                <th> </th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Availability</th>
                <th>Date created</th>
                <th>Expiry date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.images[0]} alt="image" />
                  </td>
                  <td>{product.productName}</td>
                  <td>RWF {product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.availability ? (
                      <Link
                        to={'#'}
                        className="products-table-availability green"
                        onClick={() => handleAvailability(product.id)}
                      >
                        True
                      </Link>
                    ) : (
                      <Link
                        to={'#'}
                        className="products-table-availability red"
                        onClick={() => handleAvailability(product.id)}
                      >
                        False
                      </Link>
                    )}
                  </td>
                  <td>{formatDate(product.createdAt)}</td>
                  <td>{formatDate(product.expiryDate)}</td>
                  <td>
                    <div className="products-table-actions">
                      <Link
                        to={`/dashboard/products/${product.id}/update`}
                        className="products-table-action blue"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`#`}
                        className="products-table-action red"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="products-table-small">
            {products?.map((product) => (
              <div
                className="products-table-single-product-row"
                key={product.id}
              >
                {/* <img src={product.images[0]} /> */}
                <div className="products-table-single-product-details">
                  <label className="products-table-details name">
                    {product.productName}
                  </label>
                  <label className="products-table-details">
                    RWF {product.price}
                  </label>
                  <label className="products-table-details date">
                    {formatDate(product.expiryDate)}(EXP)
                  </label>
                  <label className="products-table-details date">
                    {formatDate(product.createdAt)}(MFG)
                  </label>
                  <Link
                    onClick={() => handleAvailability(product.id)}
                    className={`products-table-details ${
                      product.availability ? 'available' : 'not-available'
                    }`}
                  >
                    {product.availability ? 'Available' : 'not available'}
                  </Link>
                </div>
                <div className="products-table-image-icons">
                  <Link to={`/dashboard/products/${product.id}/update`}>
                    <img src={edit} alt="edit" className="edit" />
                  </Link>
                  <Link
                    to={`#`}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <img src={deleteProduct} alt="delete" className="delete" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={productsState.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeAvailability: (productId) => dispatch(updateAvailability(productId)),
  onDeleteProduct: (productId) => dispatch(deleteSingleProduct(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
