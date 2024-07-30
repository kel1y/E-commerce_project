import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;

export const ForgotPassword = createAsyncThunk(
  'users/reset-password',
  async (data) => {
    try {
      const response = await api.post(`/users/password-reset-request`, data);
      if (response.status === 200) {
        toast.success('Reset Link Sent. Please check your email.');
      }
      return response.data;
    } catch (err) {
      const error = err.response.data;
      toast.error(`Reset Password Failed: ${error.error}`);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(ForgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ForgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    builder.addCase(ForgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const forgotPasswordActions = forgotPasswordSlice.actions;
export default forgotPasswordSlice;
