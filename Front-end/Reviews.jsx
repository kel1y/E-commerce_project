import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import star1 from '../assets/Icons/star.svg';
import star2 from '../assets/Icons/filledstar.svg';
import close from '../assets/Icons/Close.svg';

import { useDispatch, useSelector } from 'react-redux';
import avatar from '../assets/Icons/avatar.svg';
import starFilled from '../assets/Icons/filledstar.svg';
import starEmpty from '../assets/Icons/star.svg';
import { fetchReviews } from '../redux/slices/product/getReviews';
import Modal from 'react-bootstrap/Modal';
import { AddReviews } from '../redux/slices/product/addReview';

const Reviews = () => {
  const { reviews, loading } = useSelector((state) => state.reviews);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [ratingError, setRatingError] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [show, setShow] = useState(false);
  const [ratings, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleSubmit = (event) => {
    let ratingsValue = ratings;
    let feedbackValue = feedback;
    event.preventDefault();
    if (ratingsValue === '') {
      setValidationError(true);
      setRatingError('Rating is required');
    } else if (feedbackValue === '') {
      setRatingError('');
      setValidationError(true);
      setFeedbackError('Feedback is required');
    } else {
      setShow(false);
      dispatch(AddReviews({ id, ratings, feedback }));
    }
  };
  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);
  const handleClose = () => {
    setRating('');
    setFeedback('');
    setValidationError(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const emptyStars = totalStars - filledStars;

    const starElements = [];

    for (let i = 0; i < filledStars; i++) {
      starElements.push(<img src={starFilled} alt="Filled Star" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      starElements.push(<img src={starEmpty} alt="Empty Star" />);
    }

    return starElements;
  };

  return (
    <div className="reviews">
      <div className="reviews-title">
        <h2>Reviews</h2>
      </div>
      <div className="write-review">
        <button onClick={handleShow} className="write-review-link">
          Write a review
        </button>
      </div>
      <Modal
        className="review-modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <button className="btn-close" onClick={handleClose}>
            <img src={close} alt="close" />
          </button>
          <form className="rating-feedback-form">
            <label for="rating">Rating:</label>
            <div className="rating-stars">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={ratingValue}>
                    <input
                      type="radio"
                      id="rating"
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
              {validationError && (
                <div className="rating-error-message" style={{ color: 'red' }}>
                  {ratingError}
                </div>
              )}
            </div>

            <br />
            <label for="feedback">Feedback:</label>
            <br />
            <textarea
              id="feedback"
              className="rating-feedback"
              placeholder="Enter your feedback"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
            {validationError && (
              <div className="rating-error-message" style={{ color: 'red' }}>
                {feedbackError}
              </div>
            )}
            <br />
            <button
              className="send-feedback-button"
              type="submit"
              onClick={handleSubmit}
            >
              Send
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {reviews && (
        <div>
          {reviews?.map((review) => (
            <div className="review" key={review.id}>
              <div className="reviewer-details">
                <div>
                  <img
                    className="reviewer-avatar"
                    src={review.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="reviewer-name">
                  {review.firstname} {review.lastname}
                </div>
                <div className="review-rating">
                  {renderStars(review.review.ratings)}
                </div>
              </div>
              <div className="review-date">
                {new Date(review.review.createdAt).toLocaleDateString('en-GB')}
              </div>
              <div className="review-content">{review.review.feedback}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
