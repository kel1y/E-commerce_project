import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../axiosinstance';

const { VITE_SERVER_URL } = process.env;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit }) => {
    try {
      const response = await api.get(`/products?page=${page}&limit=${limit}`);
      if (response.data.message === 'No products found') {
        console.log('No Products Found');
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const LandingPageProductsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const productActions = LandingPageProductsSlice.actions;
export default LandingPageProductsSlice.reducer;
