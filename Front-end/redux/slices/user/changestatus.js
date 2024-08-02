import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchUsers } from './getUsers';
import { useState } from 'react';
import api from '../../axiosinstance';

const { VITE_SERVER_URL } = process.env;

const token_str = localStorage.getItem('token');

export const ChangeStatus = createAsyncThunk(
  'users/status',
  async ({ email: email, currentPage: currentPage }, { dispatch }) => {
    try {
      const response = await api.patch(
        `/users/${email}/status`,
        {},
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
        toast.success('Status Changed Successfully.');
      } else {
        toast.error('Something went wrong');
      }
      return response.data.message;
    } catch (err) {
      let error = err;
      toast.error('Status Change Failed: ' + error.message);
      return Promise.reject(error);
    }
  }
);
export const FetchStatus = createAsyncThunk(
  'users/fetchstatus',
  async ({ email: email }) => {
    try {
      const response = await api.get(
        `/users/${email}`,
        {},
        {
          headers: { Authorization: `Bearer ${token_str}` },
        }
      );
      if (response.status === 200) {
        toast.success('Status Fetch Successfully.');
      } else {
        console.log('Something went wrong');
      }
      return response.data;
    } catch (err) {
      let error = err.response.data;
      toast.error('Status Fetch Failed: ' + error.message);
      return Promise.reject(error);
    }
  }
);
const ChangeStatusSlice = createSlice({
  name: 'userstatus',
  initialState: {
    response: null,
    message: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(ChangeStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ChangeStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    //  builder.addCase(FetchStatus.fulfilled, (state, action) => {
    //    state.loading = false;
    //    state.response = { ...action.payload };
    //    state.error = null;
    //  });
    builder.addCase(ChangeStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const FetchStatusSlice = createSlice({
  name: 'status',
  initialState: {
    response: null,
    message: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(FetchStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    //  builder.addCase(FetchStatus.fulfilled, (state, action) => {
    //    state.loading = false;
    //    state.response = { ...action.payload };
    //    state.error = null;
    //  });
    builder.addCase(FetchStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const ChangeStatusActions = ChangeStatusSlice.actions;
export const FetchStatusActions = FetchStatusSlice.actions;

export default ChangeStatusSlice;
