/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import db from '../database/models/index';
import verifyToken from '../utils/jwt.util';
import createProductWishes from '../services/productWish';

const { ProductWishlist, Product, sequelize } = db;

export const addProductToWishlist = async (req, res) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const verifyUser = verifyToken(token, process.env.JWT_SECRET);
    const { product_id } = req.body;
    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Product not found'
      });
    }
    if (!verifyUser.payload.id) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Unauthorized access!'
      });
    }

    const productWishes = await ProductWishlist.findOne({
      where: { product_id, user_id: verifyUser.payload.id }
    });
    if (productWishes) {
      await productWishes.destroy();
      return res.status(201).json({
        status: 201,
        success: true,
        message: 'product wish removed!'
      });
    }
    if (verifyUser.payload.role === 'buyer') {
      const wishedProduct = {
        user_id: verifyUser.payload.id,
        product_id: product.id
      };
      await createProductWishes(wishedProduct);
      return res.status(201).json({
        status: 201,
        success: true,
        message: 'Product added to wishlist successfully!',
        productWish: wishedProduct
      });
    }
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'only buyer can wish a product!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const getAllProductWishes = async (req, res) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const verifyUsers = verifyToken(token, process.env.JWT_SECRET);

    if (!verifyUsers) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Unauthorized!'
      });
    }
    let product;
    let productWishlist;
    if (verifyUsers.payload.role === 'buyer') {
      productWishlist = await ProductWishlist.findAll({
        where: { user_id: verifyUsers.payload.id }
      });

      if (productWishlist.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: 'Your Wishlist Is Empty'
        });
      }

      const productIds = productWishlist.map((item) => item.product_id);
      product = await Product.findAll({
        where: { id: productIds }
      });

      console.log(product);
    } else if (verifyUsers.payload.role === 'seller') {
      const seller_id = verifyUsers.payload.id;
      productWishlist = await ProductWishlist.findAll({
        attributes: [
          'product_id',
          [sequelize.fn('count', sequelize.col('product_id')), 'NumberOfWishes']
        ],

        include: [
          {
            model: Product,
            where: { seller_id },
            attributes: []
          }
        ],
        group: ['product_id']
      });
    } else {
      return res.status(403).json({
        status: 403,
        success: false,
        message: 'Forbidden access!'
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Product wishes retrieved successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleProductWish = async (req, res) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const verifyUser = verifyToken(token, process.env.JWT_SECRET);

    const seller_id = verifyUser.payload.id;
    if (!verifyUser.payload.id || verifyUser.payload.role !== 'seller') {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Unauthorized access!'
      });
    }
    const { product_id } = req.params;

    const product = await Product.findOne({ where: { id: product_id } });
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: 'Product not found in your collection' });
    }
    if (product.seller_id !== req.user.id) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized access!' });
    }

    const productWishlist = await ProductWishlist.findAll({
      attributes: [
        'product_id',
        [sequelize.fn('count', sequelize.col('product_id')), 'NumberOfWishes']
      ],
      include: [
        {
          model: Product,
          where: { seller_id, id: product_id },
          attributes: []
        }
      ],
      group: ['product_id']
    });
    return res.status(200).json({
      status: 200,
      success: true,
      productWishlist
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error
    });
  }
};
