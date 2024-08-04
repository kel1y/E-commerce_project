/* eslint-disable camelcase */
import { Op } from 'sequelize';
import findOneUserService from '../services/authService';
import {
  searchInProduct,
  searchInCategory,
} from '../services/searchProductService';
import { searchHistory } from '../services/product.service';

const searchProduct = async (req, res) => {
  try {
    const user = await findOneUserService(req.user.id);
    const userRole = user.role;
    const buyer_id = user.id;

    const {
      name, description, category, minPrice, maxPrice
    } = req.query;

    // Remove the trailing spaces from the filters

    const Productname = name ? name.trim() : '';
    const TrimDescription = description ? description.trim() : '';
    const MinTrimed = minPrice ? minPrice.trim() : '';
    const MaxTrimed = maxPrice ? maxPrice.trim() : '';

    // queries to search a product

    const ByNameQuery = {
      productName: {
        [Op.iLike]: `%${Productname}%`,
      },
    };
    const ByDescriptionQuery = {
      description: {
        [Op.iLike]: `%${TrimDescription}%`,
      },
    };
    const ByPriceQuery = {
      price: {
        [Op.between]: [MinTrimed, MaxTrimed],
      },
    };
    const ByCategoryQuery = {
      categoryName: {
        [Op.iLike]: `%${category}%`,
      },
    };
    const ByNameAndDescription = {
      [Op.and]: [ByNameQuery, ByDescriptionQuery],
    };
    const ByNameAndPrice = {
      [Op.and]: [ByNameQuery, ByPriceQuery],
    };
    const CombinedQuery = {
      [Op.and]: [ByNameQuery, ByDescriptionQuery, ByPriceQuery],
    };
    if (MinTrimed > MaxTrimed) {
      return res
        .status(400)
        .json({ error: 'minimum price can not be greater than maximum price' });
    }
    if (!name && !description && !minPrice && !maxPrice && !category) {
      return res
        .status(400)
        .json({ error: 'All fields are not allowed to be empty' });
    }
    if (userRole === 'buyer' || userRole === 'admin') {
      if (name && description && minPrice && maxPrice) {
        const product = await searchInProduct(CombinedQuery);
        return res.status(200).json(product);
      }
      if (name && description) {
        const product = await searchInProduct(ByNameAndDescription);
        await searchHistory(buyer_id, product);
        return res.status(200).json(product);
      }
      if (name && minPrice && maxPrice) {
        const product = await searchInProduct(ByNameAndPrice);
        await searchHistory(buyer_id, product);
        return res.status(200).json(product);
      }
      if (name) {
        const product = await searchInProduct(ByNameQuery);
        await searchHistory(buyer_id, product);
        return res.status(200).json(product);
      }
      if (description) {
        const product = await searchInProduct(ByDescriptionQuery);
        await searchHistory(buyer_id, product);
        return res.status(200).json(product);
      }
      if (minPrice && maxPrice) {
        const product = await searchInProduct(ByPriceQuery);
        await searchHistory(buyer_id, product);
        return res.status(200).json(product);
      }
      if (category) {
        const product = await searchInCategory(ByCategoryQuery);
        const Products = product.map((p) => p.Products).flat();
        await searchHistory(buyer_id, product);
        return res.status(200).json(Products);
      }
    }
    if (userRole === 'seller') {
      const ByName = {
        [Op.and]: [
          { productName: { [Op.iLike]: `%${Productname}%` } },
          { seller_id: req.user.id },
        ],
      };
      const ByDescription = {
        [Op.and]: [
          { description: { [Op.iLike]: `%${TrimDescription}%` } },
          { seller_id: req.user.id },
        ],
      };
      const ByPrice = {
        [Op.and]: [
          { price: { [Op.between]: [MinTrimed, MaxTrimed] } },
          { seller_id: req.user.id },
        ],
      };
      const ByNameAndPrices = {
        [Op.and]: [ByName, ByPrice],
      };
      const ByNameAndDescriptionQuery = {
        [Op.and]: [ByName, ByDescription],
      };
      const QueryCombined = {
        [Op.and]: [ByName, ByDescription, ByName],
      };
      if (name && description && minPrice && maxPrice) {
        const product = await searchInProduct(QueryCombined);
        return res.status(200).json(product);
      }
      if (name && description) {
        const product = await searchInProduct(ByNameAndDescriptionQuery);
        return res.status(200).json(product);
      }
      if (name && minPrice && maxPrice) {
        const product = await searchInProduct(ByNameAndPrices);
        return res.status(200).json(product);
      }
      if (name) {
        const product = await searchInProduct(ByName);
        return res.status(200).json(product);
      }
      if (description) {
        const product = await searchInProduct(ByDescription);
        return res.status(200).json(product);
      }
      if (minPrice && maxPrice) {
        const product = await searchInProduct(ByPrice);
        return res.status(200).json(product);
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default searchProduct;
