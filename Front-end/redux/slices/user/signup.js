import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;

export const signup = createAsyncThunk('users/register', async (data) => {
  try {
    const response = await api.post(`/users/register`, data);
    if (response.status === 201) {
      toast.success('User created. Please verify your email.');
    }
    return response.data;
  } catch (err) {
    const error = err.response.data;
    toast.error(`Signup failed: ${error.message}`);
  }
});

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice;
