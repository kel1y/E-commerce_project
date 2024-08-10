import * as dotenv from "dotenv";
import EventEmitter from "events";
import { io } from "../utils/socket";
import db from "../database/models/index";

import sendMessage from "../utils/sendgrid.util";
import { orderItemStatusChange } from "../helpers/sendMessage";
import markProductExpired from "./markProductExpired";

dotenv.config();

const { User, Product } = db;

const productEventsEmitter = new EventEmitter();

productEventsEmitter.on("product expired", (products) => {
  markProductExpired(products);
  if (products.length > 0) {
    for (const product of products) {
      const message = `Hello, product "${product.productName}" has expired`;
      const date = new Date().toISOString().slice(0, 10);
      io.to(`user-${product.seller_id}`).emit("notification", {
        header: "Product expired",
        body: message,
        date: date,
        read: false,
      });
    }
  }
});

productEventsEmitter.on(
  "order item status updated",
  async (userId, productId, status) => {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    const message = orderItemStatusChange(product, status);
    const subject = "Order item status changed";
    await sendMessage(user.email, message, subject);

    const date = new Date().toISOString().slice(0, 10);
    io.to(`user-${userId}`).emit("notification", {
      header: "Your Orders",
      body: message,
      date: date,
      read: false,
    });
  }
);

export default productEventsEmitter;
