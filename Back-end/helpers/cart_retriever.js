import db from '../database/models/index';

const { Cart } = db;

export const cart_retriver = async (id) => {
  const existingCart = await Cart.findOne({
    where: { buyer_id: id }
  });

  if (!existingCart) return { message: 'cart not found' };

  const existingItems = [];
  existingCart.items.forEach((item) => {
    if (existingItems.includes(item)) {
      existingItems[item.id].quantity += item.quantity;
    } else {
      existingItems.push({
        id: item.id,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity
      });
    }
  });

  return {
    message: 'ok',
    existingItems,
    cartTotal: existingCart.cartTotal,
    Buyer: existingCart.buyer_id
  };
};
