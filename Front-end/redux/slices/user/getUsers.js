import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../axiosinstance';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const token_str = localStorage.getItem('token');
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit }) => {
    try {
      const response = await api.get(
        `/users?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token_str}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const AdminDashboardUsersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const userActions = AdminDashboardUsersSlice.actions;
export default AdminDashboardUsersSlice.reducer;
