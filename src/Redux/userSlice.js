import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { API_URL } from '../utils/constants';

export const fetchUserData = createAsyncThunk('user/fetchUserData',async ()=>{
  const response = await fetch(API_URL+'/profile',{
    method:"GET",
    credentials:'include'
  })

  const data = await response.json(); 
  console.log(data);
  return data;
})


const userSlice = createSlice({
  name:'user',
  initialState :{
    user:null,
    error:null
  },
  reducers:{
    setUser :(state,action)=>{
      state.user = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchUserData.fulfilled ,(state,action)=>{
      state.user = action.payload;
    })
    .addCase(fetchUserData.rejected,(state,action)=>{
      state.error = action.payload
    })
  }
})

export const {setUser}  = userSlice.actions
export default userSlice.reducer

