import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const { VITE_SERVER_URL } = process.env;
const token = localStorage.getItem('token');

export const getAllProductWishes = createAsyncThunk('xproductWishes', async () => {
  try {
    const response = await axios.get(`${VITE_SERVER_URL}/productWishes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    const error = err.response.data;
    throw error;
  }
});

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
    return product_id;
  } catch (err) {
    const error = err.response.data;
    throw error;
  }
});

const getAllProductWishesSlice = createSlice({
  name: 'getAllProductWishes',
  initialState: {
    wishlist: [],
    loading: false,
    error: null,

    loadingAddOrRemove: false,
    errorAddOrRemove: null,

  },
  reducers: {
    clearWishlist: (state) => {
      state.wishlist = [];
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductWishes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProductWishes.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload?.product;
      state.error = null;
    });
    builder.addCase(getAllProductWishes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loadingAddOrRemove = true;
    });
    builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
      state.loadingAddOrRemove = false;
      const currentWishlist =JSON.parse(JSON.stringify(state.wishlist));

      state.wishlist = currentWishlist?.filter((item) => item.id !== action.payload.product_id);
      state.errorAddOrRemove = null;
    });
    builder.addCase(addProductToWishlist.rejected, (state, action) => {
      state.loadingAddOrRemove = false;
      state.errorAddOrRemove = action.error;
    });
  },
});

export const { clearWishlist } = getAllProductWishesSlice.actions;
export default getAllProductWishesSlice;
