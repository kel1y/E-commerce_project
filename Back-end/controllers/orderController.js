import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../database/models/index';
import productEventsEmitter from '../events/productEvents';

dotenv.config();
const { Order } = db;
const { OrderItem } = db;

const getOrderItems = async (req, res) => {
  try {
    const sellerID = req.user.id;
    const sellerItems = await OrderItem.findAll({
      where: { seller_id: sellerID }
    });
    if (sellerItems.length > 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        data: sellerItems
      });
    }
    return res.status(404).json({
      status: 404,
      success: false,
      message: 'No order items found'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to get order items',
      error: error.message
    });
  }
};

export const updateOrderItem = async (req, res) => {
  try {
    const sellerID = req.user.id;
    const itemId = req.params.id;
    const itemFound = await OrderItem.findOne({ where: { id: itemId } });
    const foundItemSeller = itemFound.seller_id;
    if (foundItemSeller !== sellerID) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorised' });
    }
    itemFound.status = req.body.status;
    const updatedStatus = await itemFound.save();

    const order = await Order.findByPk(itemFound.order_id);
    productEventsEmitter.emit(
      'order item status updated',
      order.buyer_id,
      itemFound.product_id,
      itemFound.status
    );
    return res.status(201).json({
      status: 201,
      success: true,
      data: updatedStatus.status
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to update order items status',
      error: error.message
    });
  }
};
export const getAllUserOrders = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
  const orders = await Order.findAll({
    where: {
      buyer_id: decodedData.payload.id
    }
  });

  return res.json({ message: 'Orders', orders });
};

export const getOrderStatus = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const { order_id } = req.params; // get the item ID from the request parameters

    const order = await Order.findOne({
      where: {
        buyer_id: decodedData.payload.id,
        id: order_id
      }
    });

    if (order) {
      return res.json({ status: order.status });
    }
    return res.json({ message: ' Order not found' });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
export default getOrderItems;
