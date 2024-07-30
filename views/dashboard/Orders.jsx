import React, { useEffect, useState } from 'react';
import '../../styles/OrderTable.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../redux/slices/order/getAllOrder';
import spinner from '../../assets/Icons/spinner.svg';

const OrderDetailsCard = ({ order, onClose }) => {
  return (
    <div className="order-details-card">
      <div className="order-details-header">
        <button className="order-x-button" onClick={onClose}>
          <span className="order-x-letter">X</span>
        </button>
      </div>
      <div className="order-details-content">
        <p
          className={`order-detail-title ${
            order?.status === 'successfull'
              ? 'delivered'
              : order?.status === 'pending'
              ? 'pending'
              : order?.status === 'processing'
              ? 'accepted'
              : order?.status === 'canceled'
              ? 'canceled'
              : ''
          }`}
        >{`Your order is ${order?.status}`}</p>
        <div className="order-total-badge">
          <p>
            Total:{'  '}
            <span className="total-amount">{`RWF ${order?.total.toLocaleString()}`}</span>
          </p>
          <p
            className={`order-detail-badge ${
              order?.status === 'successfull'
                ? 'delivered'
                : order?.status === 'pending'
                ? 'pending'
                : order?.status === 'processing'
                ? 'accepted'
                : order?.status === 'canceled'
                ? 'canceled'
                : ''
            }`}
          >
            {order?.status}
          </p>
        </div>
        <p className="order-detail-date">{`Added on ${new Date(
          order?.createdAt
        ).toLocaleDateString()}`}</p>
        <div className="order-product-line"></div>
        <div>
          {order?.products &&
            order.products
              .reduce((accum, product) => {
                const existingProduct = accum.find((p) => p.id === product.id);
                if (existingProduct) {
                  existingProduct.quantity += 1;
                } else {
                  accum.push({ ...product, quantity: 1 });
                }
                return accum;
              }, [])
              .map((product, index) => (
                <div key={product.id}>
                  <div className="order-product-detail">
                    <p className="order-product-name">{product.productName}</p>
                    <p className="order-product-quantity">{product.quantity}</p>
                  </div>
                  <div className="order-product-line"></div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders); // Access state.orders directly
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleOrderView = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="order-container">
        <div className="order-title">
          <label className="order-table-title">Orders</label>
        </div>

        {isLoading ? (
          <div className="order-container" data-testid="order-container">
            <img
              src={spinner}
              style={{ height: '55px', marginLeft: '50px' }}
              alt="loader"
            />
          </div>
        ) : (
          <>
            <div className="order-table-container">
              <table className="order-table">
                <thead>
                  <tr className="table-header-container">
                    <th>Order id</th>
                    <th>Full price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Date added</th>
                    <th>action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders?.map((order) => (
                    <tr key={order?.id}>
                      <td>#{order?.id.slice(0, 8)}</td>
                      <td>RWF{order?.total}</td>
                      <td>{order?.products?.length || 0}</td>
                      <td>
                        <button
                          className={`order-status-btn ${
                            order?.status === 'successfull'
                              ? 'delivered'
                              : order?.status === 'pending'
                              ? 'pending'
                              : order?.status === 'processing'
                              ? 'accepted'
                              : order?.status === 'canceled'
                              ? 'canceled'
                              : ''
                          }`}
                        >
                          {order?.status}
                        </button>
                      </td>
                      <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="order-view-btn"
                          onClick={() => handleOrderView(order)}
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedOrder && (
              <div className="order-details-overlay">
                <OrderDetailsCard
                  key={selectedOrder.id}
                  order={selectedOrder}
                  onClose={handleCloseOrderDetails}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Orders;
