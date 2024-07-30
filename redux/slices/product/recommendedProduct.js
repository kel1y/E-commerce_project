import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const {VITE_SERVER_URL} = process.env
const token = localStorage.getItem('token');

const initialState = {
    recommended: [],
    loading: false,
    err: null,
}

const getRecommendedProducts = createAsyncThunk('getRecommendedProducts/product',
async (product, {rejectWithValue}) =>{
    try {
        
   
    const response = await axios.get(`${VITE_SERVER_URL}/product/recommend`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data;
    } catch (error) {
    return rejectWithValue(error.response.message)
    }
})

const getRecommendedProductsSlice = createSlice({
    name:'Recommended',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(getRecommendedProducts.pending, state =>{
            state.isLaoding = true;
        })
        builder.addCase(getRecommendedProducts.fulfilled, (state, {payload}) =>{
            state.recommended = payload
        })
        builder.addCase(getRecommendedProducts.rejected, (state, {payload}) =>{
            state.error = payload
        })
    }
})

const getRecommendedProductsReducer = getRecommendedProductsSlice.reducer;

export {getRecommendedProducts , getRecommendedProductsReducer}