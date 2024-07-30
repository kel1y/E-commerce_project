import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;
const token = localStorage.getItem('token');

export const checkout = createAsyncThunk('checkout', async () => {
  try {
    const response = await api.post(
      `/orders/checkout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { url } = response.data;
    window.location.href = url;

    return response.data;
  } catch (err) {
    const error = err.response.data;
    toast.error(`Checkout failed: ${error.message}`);
    throw error;
  }
});

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(checkout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkout.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(checkout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;
