import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const token_str = localStorage.getItem('token');
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}/reviews`, {
        headers: {
          Authorization: `Bearer ${token_str}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const ReviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.error = null;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const reviewActions = ReviewsSlice.actions;
export default ReviewsSlice.reducer;
