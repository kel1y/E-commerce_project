import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_SERVER_URL } = process.env;

export const fetchCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const res = await axios({
      method: 'get',
      url: `${VITE_SERVER_URL}/categories`,
    });
    return res.data.categories;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const categoryActions = categoriesSlice.actions;
export default categoriesSlice;
