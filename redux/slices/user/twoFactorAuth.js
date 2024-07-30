import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env

export const twoFactorAuth = createAsyncThunk(
  'twoFactorAuth',
  async (data) => {
    try {
      const response = await api.post(
        `/users/otp/verify/${data.OTPtoken}`,
        { otp: data.otp }
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.loginToken)
        localStorage.removeItem('OTPtoken')
        toast.success('User authenticated successfully.');       
      }
      window.location.href = '/dashboard'
      return response.data;
    } catch (err) {
      const error = err.response.data;
      toast.error(`Two-factor authentication failed: ${  error.message}`);
      throw error;
    }
  }
);

const twoFactorAuthSlice = createSlice({
  name: 'twoFactorAuth',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(twoFactorAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(twoFactorAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(twoFactorAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const twoFactorAuthActions = twoFactorAuthSlice.actions;
export default twoFactorAuthSlice;
