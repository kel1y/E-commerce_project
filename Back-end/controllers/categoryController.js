/* eslint-disable linebreak-style */
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../database/models/index";

dotenv.config();
const { Category } = db;

export const getAllCategories = async (req, res) => {
  const categories = await Category.findAll();

  if (!categories) res.status(400).json({ message: "No categories found" });

  res
    .status(200)
    .json({ message: "Categories retrieved successfully", categories });
};

export const getSingleCategory = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findByPk(categoryId);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  return res
    .status(200)
    .json({ message: "category retrieved successfully", category });
};

const CreateCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      where: {
        categoryName: req.body.categoryName,
      },
    });

    if (existingCategory) {
      return res.status(401).json({ error: "Category already exists" });
    }

    const category = await Category.create({
      categoryName: req.body.categoryName,
    });

    return res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const { categoryName } = req.body;
    if (categoryName == category.categoryName) {
      return res.status(400).json({ error: "Category name cannot be same" });
    }
    await category.update({ categoryName });
    await category.save();
    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export default CreateCategory;
