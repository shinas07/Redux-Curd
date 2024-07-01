

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('token data' , response.data.access)
      localStorage.setItem('token', response.data.access); // Store token in localStorage
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.access; // Assuming the payload includes an 'access' token
        state.loading = false;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed. Please try again.';
      });
  },
});

export const loginReducer = loginSlice.reducer;
