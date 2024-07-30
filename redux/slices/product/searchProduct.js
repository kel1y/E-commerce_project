import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;
const token = localStorage.getItem('token');
const searchProduct = createAsyncThunk(
  'product/search',
  async (queryParams, { rejectWithValue }) => {
    try {
      let url = `/products/search`;
      if (
        queryParams.name &&
        queryParams.description &&
        queryParams.minPrice &&
        queryParams.maxPrice
      )
        url += `?name=${queryParams.name}&description=${queryParams.description}&minPrice=${queryParams.minPrice}&maxPrice=${queryParams.maxPrice}`;
      else if (queryParams.name && queryParams.description)
        url += `?name=${queryParams.name}&description=${queryParams.description}`;
      else if (queryParams.name && queryParams.minPrice && queryParams.maxPrice)
        url += `?name=${queryParams.name}&minPrice=${queryParams.minPrice}&maxPrice=${queryParams.maxPrice}`;
      else if (queryParams.minPrice && queryParams.maxPrice)
        url += `?minPrice=${queryParams.minPrice}&maxPrice=${queryParams.maxPrice}`;
      else if (queryParams.category) url += `?category=${queryParams.category}`;
      else if (queryParams.description)
        url += `?description=${queryParams.description}`;
      else if (queryParams.name) url += `?name=${queryParams.name}`;

      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const productSearchSlices = createSlice({
  name: 'search',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(searchProduct.pending, (state) => {
      state.data = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchProduct.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(searchProduct.rejected, (state, { payload }) => {
      state.data = null;
      state.isLoading = false;
      state.error = payload;
    });
  },
});
const searchReducer = productSearchSlices.reducer;

export { searchProduct, searchReducer };
