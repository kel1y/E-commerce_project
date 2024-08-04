/* eslint-disable linebreak-style */
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../database/models/index';
import cloudinary from '../uploads';
import tokenDecode from '../helpers/token_decode';

dotenv.config();
const { Product } = db;
const { User } = db;

const CreateProduct = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const existingProduct = await Product.findOne({
      where: {
        productName: req.body.productName,
        seller_id: decodedData.payload.id
      }
    });

    if (existingProduct) {
      return res.status(409).json({ error: 'Product already exists' });
    }

    const product = await Product.create({
      productName: req.body.productName
        .trim()
        .replace(/[^\w\s:-]/g, '')
        .toLowerCase(),
      description: req.body.description
        .trim()
        .replace(/[^\w\s:-]/g, '')
        .toLowerCase(),
      quantity: req.body.quantity,
      price: req.body.price,
      seller_id: decodedData.payload.id,
      expiryDate: req.body.expiryDate,
      category_id: req.body.category_id
    });
    if (req.files) {
      const promises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: 'Falcons_E-comm_App/ProductImages',
          public_id: `${product.productName}image${Date.now()}`
        }));
      const results = await Promise.all(promises);
      product.images = results.map((result) => result.secure_url).filter((url) => url);
      await product.save();
    }

    return res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProductAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ status: 404, success: false, message: 'Product not found' });
    }

    if (product.seller_id !== req.user.id) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized access!' });
    }

    // toggle availability
    const newAvailability = !product.availability;

    await Product.update({ availability: newAvailability }, { where: { id } });

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Product availability updated',
      data: { id, availability: newAvailability }
    });
  } catch (error) {
    res.status(500).json({ status: 500, success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updateData = req.body;
    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        status: 404,
        success: false,
        message: 'No data provided'
      });
    }
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: 'Product not found in your collection' });
    }
    if (product.seller_id !== req.user.id) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized access!' });
    }
    if (req.files.length > 0) {
      const promises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: 'Falcons_E-comm_App/ProductImages',
          public_id: `${product.id}_image_${Date.now()}`
        })
      );

      const results = await Promise.all(promises);
      updateData.images = results.map((result) => result.secure_url).filter((url) => url);
    } else {
      updateData.images = product.images;
    }

    const updatedProduct = await product.update(updateData, { returning: true });
    const returnedProduct = {
      productName: updatedProduct.productName,
      description: updatedProduct.description,
      price: updatedProduct.price,
      quantity: updatedProduct.quantity,
      category_id: updatedProduct.category_id,
      images: updatedProduct.images,
      expiryDate: updatedProduct.expiryDate
    };

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Product updated successfully',
      data: returnedProduct
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: `Internal Server Error ${error.message}`
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ status: 404, success: false, message: 'Product not found' });
    }

    if (product.seller_id !== req.user.id) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized access' });
    }

    await Product.destroy({ where: { id } });

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ status: 500, success: false, message: error.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit ||10; 

    let whereClause = { availability: true }; 
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedData = await tokenDecode(token);
      const user = await User.findOne({
        where: {
          id: decodedData.payload.id
        }
      });
      if (user && user.role == 'seller') {
        whereClause = { seller_id: decodedData.payload.id }; 
      }
    }

    const totalCount = await Product.count({ where: whereClause }); 
    const totalPages = Math.ceil(totalCount / limit);   

    const offset = (page - 1) * limit; 
    const Products = await Product.findAll({
      where: whereClause,
      limit,
      offset
    });

    if (Products.length < 1) {
      return res.status(200).json({ message: 'No products found' });
    }

    res.status(200).json({
      message: 'Products Retrieved Successfully',
      Products,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedData = await tokenDecode(token);
      const user = await User.findOne({
        where: {
          id: decodedData.payload.id
        }
      });
      if (user && user.role == 'seller') {
        const Products = await Product.findAll({
          where: {
            id,
            seller_id: decodedData.payload.id
          }
        });
        if (Products.length < 1) return res.status(200).json({ message: 'No products found' });

        res.status(200).json({ message: 'Product Retrieved Successfully', Products });
      } else {
        const Products = await Product.findAll({
          where: {
            id,
            availability: true
          }
        });
        if (Products.length < 1) return res.status(200).json({ message: 'No products found' });

        res.status(200).json({ message: 'Products Retrieved Successfully', Products });
      }
    } else {
      const Products = await Product.findAll({
        where: {
          id,
          availability: true
        }
      });
      if (Products.length < 1) return res.status(200).json({ message: 'No products found' });

      res.status(200).json({ message: 'Product Retrieved Successfully', Products });
    }
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

export default CreateProduct;
