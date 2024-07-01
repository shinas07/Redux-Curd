import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { stringify } from 'postcss';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/register/', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('user data',response.data)
        return response.data;
      } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data);
        // if(error.response){
        //     console.log(error.response.data);
        //     setErrorMessage(error.response.data)
        //     return rejectWithValue(error.response.data);

        // }
      }
    }
  );




  export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    localStorage.removeItem('token');
    console.log('cleaned')
});




  const authSlice = createSlice({
    name: 'auth',
    initialState: { loading: false, error: null, user:localStorage.getItem('token') },
    reducers: {
        setUser:(state,action)=>{
            state.user=action.payload;
            localStorage.setItem("token",action.payload)
        },
        LogoutUser:(state)=>{
            state.user=undefined
        }
    },
    extraReducers: (builder) => {
      builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      });
      builder.addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  });


export const {setUser,LogoutUser}=authSlice.actions
export default authSlice.reducer;


