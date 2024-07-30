import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchUsers } from './getUsers';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;
const token_str = localStorage.getItem('token');
export const ChangeRole = createAsyncThunk(
  'users/role',
  async (
    { email: email, role: role, currentPage: currentPage },
    { dispatch }
  ) => {
    try {
      const response = await api.put(
        `/users/${email}/roles`,
        {
          role: role,
        },
        {
          headers: { Authorization: `Bearer ${token_str}` },
        }
      );
      if (response.status === 200) {
        dispatch(
          fetchUsers({
            page: currentPage,
            limit: 10,
          })
        );

        toast.success('Role Changed Successfully.');
      } else {
        toast.error('Something went wrong ');
      }
      return response.data.message;
    } catch (err) {
      let error = err.response.data;
      toast.error('Role Change Failed: ' + error.message);
      return Promise.reject(error);
    }
  }
);
export const updatedUser = createAsyncThunk(
  'user/updatedUser',
  async ({ email: email }) => {
    try {
      const response = await api.put(
        `/users/${email}`,

        {
          headers: { Authorization: `Bearer ${token_str}` },
        }
      );

      return response.data;
    } catch (err) {
      let error = err.response.data;
      toast.error('Somethin went wrong: ' + error.message);
      return Promise.reject(error);
    }
  }
);
const ChangeRoleSlice = createSlice({
  name: 'role',
  initialState: {
    response: null,
    message: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(ChangeRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ChangeRole.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.message = state.response;
      state.error = null;
    });
    builder.addCase(ChangeRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const ChangeRoleActions = ChangeRoleSlice.actions;
export default ChangeRoleSlice;
