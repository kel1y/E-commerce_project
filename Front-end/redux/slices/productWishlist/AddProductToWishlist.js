import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const { VITE_SERVER_URL } = process.env;
const token = localStorage.getItem('token');

export const addProductToWishlist = createAsyncThunk('productWish/add', async (product_id) => {
  try {
    const response = await axios.post(
      `${VITE_SERVER_URL}/productWish`,
      { product_id: product_id.product_id},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.data.status === 201) {
      toast.success(response.data.message);
    }
    return null;
  } catch (err) {
    const error = err.response.data;
    throw error;
  }
});

const addProductToWishlistSlice = createSlice({
  name: 'addProductToWishlist',
  initialState: {
    loading: false,
    error: null,
    // wishlist: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProductToWishlist.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      // state.wishlist = action.payload

    });
    builder.addCase(addProductToWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const addToWishlistActions = addProductToWishlistSlice.actions;
export default addProductToWishlistSlice;