import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { productActions } from '../sellerProducts';
import api from '../../axiosinstance';

const tokenStr = localStorage.getItem('token');

export const deleteSingleProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { dispatch }) => {
    try {
      const response = await api({
        method: 'delete',
        url: `/products/${id}/delete`,
        headers: { Authorization: `Bearer ${tokenStr}` },
      });

      if (response.status == 200) {
        toast.success('Product deleted');

        dispatch(productActions.deleteProduct(id));
        return response.data;
      } else {
        throw new Error('error');
      }
    } catch (error) {
      const errorMessage = error.response.data.message
        ? error.response.data.message
        : 'Something went wrong!';
      toast.error(`Product not deleted: ${errorMessage}`);
      return error;
    }
  }
);

const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState: {
    loading: false,
    error: null,
    response: null,
    serverResponded: false,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSingleProduct.pending, (state) => {
      state.loading = true;
      state.serverResponded = false;
      state.error = null;
      state.response = null;
    });
    builder.addCase(deleteSingleProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.serverResponded = true;
    });
    builder.addCase(deleteSingleProduct.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.serverResponded = true;
    });
  },
});

export const deleteProductActions = productDeleteSlice.actions;
export default productDeleteSlice;
