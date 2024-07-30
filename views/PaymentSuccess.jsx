import React, { useEffect, useState } from 'react';
import '../styles/checkout.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/order/getAllOrder';
import spinner from '../assets/Icons/spinner.svg';

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      const sortedOrders = [...orders].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      setSelectedOrder(sortedOrders[0]);
    }
  }, [orders]);

  if (isLoading) {
    return (
      <div>
        <img src={spinner} style={{ height: '25px' }} alt="loader" />
      </div>
    );
  }

  return (
    <div data-testid="checkout-success" className="checkout-success-container">
      <p className="checkout-success-message">
        Payment Successful! Your order is being processed
      </p>
      <p className="checkout-success-message">
        Here is a short summary of your order.
      </p>
      <div className="checkout-cards-container">
        {selectedOrder.products && selectedOrder.products.length > 0 ? (
          <table className="checkout-table">
            <thead>
              <tr>
                <th className="checkout-table-header">Product Name</th>
                <th className="checkout-table-header">Price per Item</th>
                <th className="checkout-table-header">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.products
                .reduce((accum, product) => {
                  const existingProduct = accum.find(
                    (p) => p.id === product.id
                  );
                  if (existingProduct) {
                    existingProduct.quantity += 1;
                  } else {
                    accum.push({ ...product, quantity: 1 });
                  }
                  return accum;
                }, [])
                .map((item, index) => (
                  <tr key={item.id}>
                    <td
                      className="checkout-table-cell"
                      data-testid="checkout-item-name"
                    >
                      {item.productName}
                    </td>
                    <td
                      className="checkout-table-cell"
                      data-testid="checkout-item-price"
                    >
                      RWF{item.price}
                    </td>
                    <td
                      className="checkout-table-cell"
                      data-testid="checkout-item-number"
                    >
                      {item.quantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <p className="checkout-total">Total Payment: RWF {selectedOrder.total}</p>
      <Link className="checkout-home" to="/">
        Click to go back Home
      </Link>
    </div>
  );
}
