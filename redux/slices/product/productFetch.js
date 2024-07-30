import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../axiosinstance';

export const fetchProduct = createAsyncThunk(
  'product/productFetch',
  async (productId) => {
    try {
      const response = await api({
        method: 'get',
        url: `/products/${productId}`,
      });

      if (response.status == 200) {
        if (response.data.Products) return response.data.Products[0];
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

const productFetchSlice = createSlice({
  name: 'productFetch',
  initialState: {
    loading: false,
    error: null,
    response: null,
    fetchedProduct: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.fetchedProduct = { ...action.payload };
      state.loading = false;
    });
  },
});

export const productFetchActions = productFetchSlice.actions;
export default productFetchSlice;
