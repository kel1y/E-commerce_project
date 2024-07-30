import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;
const token = localStorage.getItem('token');

export const clearCart = createAsyncThunk('cart/clear', async () => {
  try {
    const response = await api.delete(`/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    const error = err.response.data;
    toast.error(`Clearing cart failed: ${error.message}`);
    throw error;
  }
});

const clearCartSlice = createSlice({
  name: 'clearCart',
  initialState: {
    cart: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(clearCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.loading = false;
      state.cart = {};
      state.error = null;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const clearCartActions = clearCartSlice.actions;
export default clearCartSlice;
