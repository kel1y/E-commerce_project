import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import api from '../../axiosinstance';

const tokenStr = localStorage.getItem('token');

const { VITE_SERVER_URL } = process.env;

export const saveProduct = createAsyncThunk(
  'product/productAdd',
  async (data) => {
    try {
      const response = await api({
        method: 'post',
        url: `/products`,
        data,
        headers: { Authorization: `Bearer ${tokenStr}` },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Product added successfully!',
          text: `${response.data.productName} has been added.`,
          confirmButtonColor: '#64B937',
        }).then(() => {
          window.location.href = '/dashboard/products';
        });
      }

      return response.data; // Return the response data as the fulfilled action payload
    } catch (err) {
      const error =
        typeof err.response.data === 'object'
          ? err.response.data.error
          : err.response.data;
      Swal.fire({
        icon: 'error',
        title: 'Product not added',
        text: error,
        confirmButtonColor: '#64B937',
      });
      return { error };
    }
  }
);

const productAddSlice = createSlice({
  name: 'productAdd',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(saveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    builder.addCase(saveProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const productAddActions = productAddSlice.actions;
export default productAddSlice;
