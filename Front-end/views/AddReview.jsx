import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import star1 from '../assets/Icons/star.svg';
import star2 from '../assets/Icons/filledstar.svg';
import { AddReviews } from '../redux/slices/product/addReview';
import { useParams } from 'react-router';

const AddReview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ratings, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(AddReviews({ id, ratings, feedback }));
  };
  return (
    <div className="add-review-container">
      <div className="review-product">Review Product</div>
      <div className="rating-form">
        <form className="rating-feedback-form">
          <label>Rating:</label>
          <div className="rating-stars">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <img
                    src={ratingValue <= ratings ? star2 : star1}
                    alt="star"
                  />
                </label>
              );
            })}
          </div>

          <br />
          <label>Feedback:</label>
          <br />
          <textarea
            className="rating-feedback"
            placeholder="Enter your feedback"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
          <br />
          <button
            className="send-feedback-button"
            type="submit"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
