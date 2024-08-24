/* eslint-disable import/no-named-as-default */
import express from "express";
import validator from "../validations/validation";
import verifyRole from "../middleware/verifyRole";
import { checkout } from "../controllers/checkoutController";
import getOrderItems, {
  getAllOrders,
  getAllUserOrders,
  getOrderStatus,
  updateOrderItem,
} from "../controllers/orderController";
import isLoggedIn from "../middleware/authMiddleware";
import { orderItemStatus } from "../validations/userSchema";

const orderRoutes = express.Router();

orderRoutes.post("/orders/checkout", verifyRole("buyer"), checkout);
orderRoutes.get("/orderItems", isLoggedIn, verifyRole("seller"), getOrderItems);
orderRoutes.patch(
  "/orderItems/:id/status",
  isLoggedIn,
  verifyRole("seller"),
  validator(orderItemStatus),
  updateOrderItem
);
orderRoutes.get("/orders", verifyRole("buyer"), getAllUserOrders);
orderRoutes.get("/orders/:order_id", verifyRole("buyer"), getOrderStatus);

export default orderRoutes;
