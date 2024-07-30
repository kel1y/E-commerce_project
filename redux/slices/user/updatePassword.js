import { createSlice } from "@reduxjs/toolkit";
import { updatePasswordThunk } from "../../Action/updatepswd";

const initialState = {
    loading: false,
    updateStatus: null,
    error: null,
}

const passwordSlice = createSlice({
    name: "updatePassword",
    initialState,
    reducers: {

    },
    extraReducers: {
        [updatePasswordThunk.pending]: (state) =>{
            return{
                ...state,
                loading: true
            }
        },
        [updatePasswordThunk.rejected]:(state,{payload})=>{
            return{
                ...state,
                loading: false,
                error: payload.message
            }
        },
        [updatePasswordThunk.fulfilled]: (state,{payload})=>{
            return{
                ...state,
                loading: false,
                updateStatus: payload.message
            };
        },
    }
})

export default passwordSlice.reducer;