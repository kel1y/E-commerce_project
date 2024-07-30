import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;
const token = localStorage.getItem('token');

export const decrementCart = createAsyncThunk(
  'cart/decrement',
  async (product_id) => {
    try {
      const response = await api.post(
        `/cart`,
        { product_id, quantity: -1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      const error = err.response.data;
      toast.error(`Update cart failed: ${error.message}`);
      throw error;
    }
  }
);
export const incrementCart = createAsyncThunk(
  'cart/increment',
  async (product_id) => {
    try {
      const response = await axios.post(
        `${VITE_SERVER_URL}/cart`,
        { product_id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      const error = err.response.data;
      toast.error(`Update cart failed: ${error.message}`);
      throw error;
    }
  }
);

const updateCartSlice = createSlice({
  name: 'updateCart',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(incrementCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(incrementCart.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(incrementCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(decrementCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(decrementCart.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(decrementCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const updateCartActions = updateCartSlice.actions;
export default updateCartSlice;
