import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const { VITE_MOMO_URL } = process.env;
const token = localStorage.getItem('token');

export const momoPay = createAsyncThunk('momo/payment', async (data) => {
  try {
    const response = await axios.post(`${VITE_MOMO_URL}/momo`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      window.location.href = '/checkout-success';
    }
    return response.data;
  } catch (err) {
    const error = err.message;
    toast.error(`Momo payment failed: ${error}`);
  }
});

const momoPaySlice = createSlice({
  name: 'momoPay',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(momoPay.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(momoPay.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    builder.addCase(momoPay.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const momoPayActions = momoPaySlice.actions;
export default momoPaySlice;
