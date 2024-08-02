/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import api from "../../axiosinstance";

const {VITE_SERVER_URL} = process.env

const updateProfile =createAsyncThunk(
    'profile/updateProfile',
        async (data) => {
            try {
                const token =localStorage.getItem('token');
                const res = await api.patch(`/users/profile`, data, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  setTimeout(() =>{
                    window.location = '/profile';
                  }, 6000)
            return res.data;
            } catch (error) {
                return error.message;
            }
    }
) 

const initialState = {
    profileData: [],
    isLoading: false,
    error: null,
}

const updateProfileSlices =createSlice ({
 name: 'updateProfile',
 initialState,
    extraReducers: (builder) =>{
        builder
        .addCase(updateProfile.pending, (state)=>{
            state.isLoading = true;
            state.profileData = null;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, {payload})=>{
            state.isLoading = false;
            state.profileData = payload;
            state.error = null;
        })
        .addCase(updateProfile.rejected, (state, {payload})=>{
            state.isLoading = false;
            state.profileData = null;
            state.error = payload;
        })
    }
 })

const getUser = createAsyncThunk(
    'user/getProfile', async () => {
        const token = localStorage.getItem('token');
        const profile = await axios.get(`${VITE_SERVER_URL}/users/profile/single`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return profile.data;
    }
)
const getProfileSlice = createSlice({
    name: 'getProfile',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getUser.pending, (state) => {
        state.isLoading = true;
          })
          .addCase(getUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.profile = payload;
            state.error = null;
          })
          .addCase(getUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
          });
      },
})

export {getUser, updateProfile};

const updateProfileReducer = updateProfileSlices.reducer;
const getProfileReducer = getProfileSlice.reducer;

export { updateProfileReducer , getProfileReducer };