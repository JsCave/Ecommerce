import { Product } from "@/interfaces";
import { apiServices } from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllProducts=createAsyncThunk('products/getAllProducts',async ()=>{
const {data}=await apiServices.getAllProducts()
return data
})

const initialState:{products:Product[]}={
    products:[]
}

const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProducts.pending,()=>{console.log('pending')})
        .addCase(getAllProducts.rejected,()=>{console.log('rejected')})
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            console.log('success')
state.products=action.payload
console.log(action.payload)
        })}
})


export const productReducer=productSlice.reducer;