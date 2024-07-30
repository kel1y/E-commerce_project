/* eslint-disable no-unreachable */
// authSlice.js
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const {VITE_GOOGLE_SERVER_URL} = process.env

export const googleSingnin = createAsyncThunk('auth/google', async (data) => {
  try {
    const response = await axios.get(`${{VITE_GOOGLE_SERVER_URL}}/auth/google`, data);
    if (response.status === 200) {
      const {token} = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/';
    }
    return response.data;
  } catch (err) {
    const error = err.response.data;
    toast.error(`Signin failed: ${  error.message}`);
  }
});

const googleAuthSlice = createSlice({
  name: 'googleAuth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the login action lifecycle states
    builder
      .addCase(googleSingnin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleSingnin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;
        state.error = null;
      })
      .addCase(googleSingnin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const googleSigninActions = googleAuthSlice.actions;
export default googleAuthSlice.reducer;
