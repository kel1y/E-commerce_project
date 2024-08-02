import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;
const token = localStorage.getItem('token');

export const deleteItemCart = createAsyncThunk('cart/delete', async (id) => {
  try {
    const response = await api.delete(`/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    const error = err.response.data;
    toast.error(`Removing item failed: ${error.message}`);
    throw error;
  }
});

const deleteItemCartSlice = createSlice({
  name: 'deleteItemCart',
  initialState: {
    loading: {},
    error: null,
    deletedItemId: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteItemCart.pending, (state, action) => {
      state.loading[action.meta.arg] = true;
    });
    builder.addCase(deleteItemCart.fulfilled, (state, action) => {
      const itemId = action.meta.arg;
      state.loading[itemId] = false;
      state.deletedItemId = itemId;
      state.error = null;
    });
    builder.addCase(deleteItemCart.rejected, (state, action) => {
      const itemId = action.meta.arg;
      state.loading[itemId] = false;
      state.error = action.error;
    });
  },
});

export const deleteItemCartActions = deleteItemCartSlice.actions;
export default deleteItemCartSlice;
