import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import api from '../../axiosinstance';

const tokenStr = localStorage.getItem('token');

export const updateProduct = createAsyncThunk(
  'product/productUpdate',
  async (productData) => {
    const { productId, data } = productData;
    try {
      const response = await api({
        method: 'patch',
        url: `/products/${productId}`,
        data,
        headers: { Authorization: `Bearer ${tokenStr}` },
      });
      if (response.status == 200) {
        const title = response.data.message;
        const text = `${response.data.data.productName} has been updated`;
        Swal.fire({
          icon: 'success',
          title,
          text,
          confirmButtonColor: '#64B937',
        });
        return response.data;
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      let text = 'Something went wrong';
      if (error.response.status == 401) {
        text = 'You are not authorised to perform this action';
      }

      Swal.fire({
        icon: 'error',
        title: 'Product not updated',
        text,
        confirmButtonColor: '#64B937',
      });
      return error;
    }
  }
);

const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState: {
    loading: false,
    error: null,
    response: null,
    serverResponded: false,
  },
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.serverResponded = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.serverResponded = true;
    });
  },
});

export const productUpdateActions = productUpdateSlice.actions;
export default productUpdateSlice;
