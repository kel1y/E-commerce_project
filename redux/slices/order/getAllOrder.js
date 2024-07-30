import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../axiosinstance';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const token_str = localStorage.getItem('token');
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (id) => {
    try {
      const response = await api.get(`${BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token_str}`,
        },
      });
      return response.data.orders;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.error = null;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const reviewActions = ordersSlice.actions;
export default ordersSlice.reducer;
