import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchReviews } from './getReviews';

const { VITE_SERVER_URL } = process.env;
const token_str = localStorage.getItem('token');
export const AddReviews = createAsyncThunk(
  'users/addreview',
  async ({ id, ratings, feedback }, { dispatch }) => {
    try {
      const response = await axios.post(
        `${VITE_SERVER_URL}/products/${id}/reviews`,
        { ratings: ratings, feedback: feedback },
        {
          headers: { Authorization: `Bearer ${token_str}` },
        }
      );
      if (
        response.status === 200 &&
        response.data.message === 'Successfully Added Review'
      ) {
        dispatch(fetchReviews(id));
        toast.success('Review Added Successfully.');

        // setTimeout(() => {
        //   window.location.href = `/products/${id}`;
        // }, 6000);
      } else if (
        response.data.message ===
        'You can add a review only when your order succeeded'
      ) {
        toast.warn('You can add a review only when your order succeeded ');
        setTimeout(() => {
          window.location.href = `/products/${id}`;
        }, 6000);
      } else if (
        response.data.message ===
        'You can add a review only when the item you ordered was approved'
      ) {
        toast.warn(
          'You can add a review only when the item you ordered was approved '
        );
        setTimeout(() => {
          window.location.href = `/products/${id}`;
        }, 6000);
      }
      return response.data.message;
    } catch (err) {
      console.log(err);
      const error = err.response.data;
      toast.error('Adding Review Failed: ' + error.message);
      return Promise.reject(error);
    }
  }
);

const AddReviewSlice = createSlice({
  name: 'adddreview',
  initialState: {
    response: null,
    message: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(AddReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AddReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    builder.addCase(AddReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const AddReviewActions = AddReviewSlice.actions;
export default AddReviewSlice;
