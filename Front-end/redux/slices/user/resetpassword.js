import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const {VITE_SERVER_URL} = process.env;

export const ResetPassword = createAsyncThunk(
  'users/reset-password',
  async (data) => {
    try {
      const response = await api.patch(
        `/users/${data.token}/password-reset`,
        { password: data.password, confirmPassword: data.confirmPassword }
      );
      if (response.status === 200) {
        toast.success('Password Reset Successfully.');
        setTimeout(() => {
          window.location.href = '/signin';
        }, 6000);
      }
      return response.data;
    } catch (err) {
      const error = err.response.data;
      toast.error(`Reset Password Failed: ${  error}`);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    response: null,
    loading: false,
    token: '',
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(ResetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ResetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    builder.addCase(ResetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const resetPasswordActions = resetPasswordSlice.actions;
export default resetPasswordSlice;
