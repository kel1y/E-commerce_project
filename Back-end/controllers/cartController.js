/* eslint-disable linebreak-style */
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../database/models";

const { Product } = db;
const { Cart } = db;

dotenv.config();

export const AddToCart = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const existingCart = await Cart.findOne({
      where: { buyer_id: decodedData.payload.id },
    });
    let existingQuantity = 0;
    // eslint-disable-next-line camelcase
    const { product_id, quantity } = req.body;
    // eslint-disable-next-line camelcase
    if (product_id) {
      const item = await Product.findOne({
        // eslint-disable-next-line camelcase
        where: { id: product_id },
      });

      if (!item) return res.status(404).json({ message: "Product not found" });

      //   check if the product already exists and is  available
      if (!existingCart) {
        if (item && quantity <= item.quantity) {
          item.quantity = quantity;
        } else {
          return res
            .status(400)
            .json({ status: 400, message: "Stock is not available" });
        }
        const cart = await Cart.create({
          items: [item], // create a new array with the item
          buyer_id: decodedData.payload.id,
          cartTotal: item.price * quantity,
        });
        res.json({ message: "Successfully Added to Cart", cart });
      } else {
        for (let i = 0; i < existingCart.items.length; i++) {
          if (existingCart && existingCart.items[i].id == product_id) {
            existingQuantity += existingCart.items[i].quantity;
          }
        }
        if (item && quantity + existingQuantity <= item.quantity) {
          item.quantity = quantity;
        } else {
          return res
            .status(400)
            .json({ status: 400, message: "Stock is not available" });
        }
        const updatedCart = await existingCart.update({
          items: [...existingCart.items, item],
          cartTotal: existingCart.cartTotal + item.price * quantity, // append the item to the existing array
        });
        const lastItemIndex = updatedCart.items.length - 1;
        const lastItem = updatedCart.items[lastItemIndex];
        return res.json({
          message: "Successfully Added Cart",
          name: lastItem.productName,
          price: lastItem.price,
          quantity: lastItem.quantity,
        });
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};
export const getCart = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const existingCart = await Cart.findOne({
      where: { buyer_id: decodedData.payload.id },
    });

    const existingItems = {};
    if (existingCart) {
      existingCart.items.forEach((item) => {
        if (existingItems[item.id]) {
          existingItems[item.id].quantity += item.quantity;
        } else {
          existingItems[item.id] = {
            id: item.id,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            image: item.images[0],
          };
        }
      });

      res.json({
        existingItems,
        cartTotal: existingCart.cartTotal,
        Buyer: existingCart.buyer_id,
      });
    } else {
      res.json({ message: "Cart is Empty" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const clearCart = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const existingCart = await Cart.findOne({
      where: { buyer_id: decodedData.payload.id },
    });
    //   check if the product already exists and is  available
    if (existingCart) {
      const cart = await existingCart.update(
        {
          items: [], // create an empty array with the item
          buyer_id: decodedData.payload.id,
          cartTotal: 0,
        },
        {
          where: { buyer_id: decodedData.payload.id },
        }
      );
      res.json({ message: "Successfully Cleared the Cart", cart });
    } else {
      return res.json({ message: "No Cart Found" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const updateCartItems = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const existingCart = await Cart.findOne({
      where: { buyer_id: decodedData.payload.id },
    });
    // eslint-disable-next-line camelcase
    const { product_id, quantity } = req.body;
    // eslint-disable-next-line camelcase
    if (product_id) {
      const item = await Product.findOne({
        // eslint-disable-next-line camelcase
        where: { id: product_id },
      });

      if (!item) return res.status(404).json({ message: "Product not found" });

      if (item && quantity <= item.quantity) {
        item.quantity = quantity;
        await item.save();
      } else {
        return res.json({ message: "Stock is not availabble" });
      }
      //   check if the product already exists and is  available
      if (!existingCart) {
        const cart = await Cart.create({
          items: [item], // create a new array with the item
          buyer_id: decodedData.payload.id,
          cartTotal: item.price * quantity,
        });
        res.json({ message: "Successfully Updated Cart", cart });
      } else {
        const updatedCart = await existingCart.update({
          items: [item],
          cartTotal: item.price * quantity, // append the item to the existing array
        });
        const lastItemIndex = updatedCart.items.length - 1;
        const lastItem = updatedCart.items[lastItemIndex];

        return res.json({
          message: "Successfully Updated Cart",
          Name: lastItem.productName,
          Description: lastItem.description,
          price: lastItem.price,
          quantity: lastItem.quantity,
          expiryDate: lastItem.expiryDate,
        });
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};
export const RemoveFromCart = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const existingCart = await Cart.findOne({
      where: { buyer_id: decodedData.payload.id },
    });
    const { item_id } = req.params; // get the item ID from the request parameters

    // check if the cart exists
    if (!existingCart) {
      return res.json({ message: "Cart not found" });
    }

    // check if the item is in the cart
    const itemIndex = existingCart.items.findIndex(
      (item) => item.id === item_id
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // filter out the item from the cart's items array by its ID
    const filteredItems = existingCart.items.filter(
      (item) => item.id !== item_id
    );

    // calculate the new cart total after removing the item
    const newCartTotal = filteredItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // update the cart with the new items array and cart total
    const updatedCart = await existingCart.update({
      items: filteredItems,
      cartTotal: newCartTotal,
    });

    return res.json({ message: "Item removed from cart", updatedCart });
  } catch (e) {
    console.log(e.message);
  }
};
