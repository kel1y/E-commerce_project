import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../database/models';
import tokenDecode from '../helpers/token_decode';

dotenv.config();
const { Review } = db;
const { User } = db;
const { OrderItem } = db;
const { Order } = db;

export const AddReview = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);
  const reviewer = await User.findOne({
    where: { id: decodedData.payload.id },
  });
  console.log(reviewer.firstname);
  const review = {
    product_id: req.params.id,
    buyer_id: decodedData.payload.id,
    ratings: req.body.ratings,
    feedback: req.body.feedback,
  };

  try {
    const product = await OrderItem.findOne({
      where: {
        product_id: req.params.id,
        status: 'approved',
      },
    });
    if (product) {
      const successfulOrder = await Order.findAll({
        where: {
          id: product.order_id,
          status: 'successfull',
        },
      });
      if (successfulOrder) {
        const review_added = await Review.create(review);
        res.json({
          message: 'Successfully Added Review',
          review: {
            review_added,
            buyer_firstname: reviewer.firstname,
            buyer_lastname: reviewer.lastname,
            avatar: reviewer.avatar,
          },
        });
      } else {
        res.status(406).json({
          message: 'You can add a review only when your order succeeded',
        });
      }
    } else {
      res.status(406).json({
        message:
          'You can add a review only when the item you ordered was approved',
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.findAll({
      where: {
        product_id: id,
      },
    });
    const reviewerIds = reviews.map((review) => review.buyer_id);
    const reviewers = await User.findAll({
      where: { id: reviewerIds },
    });

    const reviewData = reviews.map((review) => {
      const reviewer = reviewers.find((user) => user.id === review.buyer_id);
      return {
        review,
        avatar: reviewer.avatar,
        firstname: reviewer.firstname,
        lastname: reviewer.lastname,
      };
    });

    res.json(reviewData);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);

  try {
    const review = await Review.findOne({
      where: {
        id: req.params.id,
        buyer_id: decodedData.payload.id,
      },
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.destroy();

    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateReview = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedData = jwt.verify(token, `${process.env.JWT_SECRET}`);

  const review = {
    ratings: req.body.ratings,
    feedback: req.body.feedback,
  };

  try {
    const existingReview = await Review.findOne({
      where: {
        id: req.params.id,
        buyer_id: decodedData.payload.id,
      },
    });

    if (!existingReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await existingReview.update(review);

    return res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
