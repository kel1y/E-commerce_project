/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;
const token = localStorage.getItem('token');

export const getCart = createAsyncThunk('/cart', async () => {
  try {
    const response = await api.get(`/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    const error = err.response.data;
    toast.error(`Getting cart failed: ${error.message}`);
  }
});

const getCartSlice = createSlice({
  name: 'getCart',
  initialState: {
    cart: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.error = null;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const getcartActions = getCartSlice.actions;
export default getCartSlice;
