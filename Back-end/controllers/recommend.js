import getRandomElements from '../helpers/random';
import { getSearchHistory, getCartService, getAllProductsService } from '../services/product.service';

const recommendedProduct = async (req, res) => {
  const limit = 3;
  try {
    const searchHistory = await getSearchHistory(req.user.id);
    let cart = await getCartService(req.user.id);
    cart = cart.flatMap((item) => item.items.map((itemId) => itemId.id));
    let products = await getAllProductsService();
    products = products.map((item) => item.id);
    const randomProduct = getRandomElements(products, limit);
    let recomended;
    if (cart && searchHistory) {
      recomended = [randomProduct, searchHistory.products, cart];
      return res.status(200).json(recomended.flat());
    }
    recomended = [randomProduct];
    return res.status(200).json(recomended.flat());
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default recommendedProduct;
