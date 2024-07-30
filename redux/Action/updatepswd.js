/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../axiosinstance';
import axios from 'axios';

const { VITE_SERVER_URL } = process.env;
const token_str = localStorage.getItem('token');
export const updatePasswordThunk = createAsyncThunk(
  'user/update-password',
  async (password, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${VITE_SERVER_URL}/users/password`, password, {
        headers: { Authorization: `Bearer ${token_str}` },
      });

       console.log(response.data)
       if (response.data.message === 'password updated successfully') {
         toast.success(response.data.message);
         setTimeout(() => {
           window.location.href = '/profile';
         }, 3000);
       }
       else{
        toast.warn(response.data.message)
       }
      
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error)
      return rejectWithValue(error.response.data);
    }
  }
);
