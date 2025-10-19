// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Async action برای لاگین
export const login = () => async (dispatch) => {
  dispatch(loginStart());
  
  try {
    const result = await authService.login();
    
    if (result.success) {
      dispatch(loginSuccess(result.token));
      return { success: true };
    } else {
      dispatch(loginFailure(result.error));
      return { success: false, error: result.error };
    }
  } catch (error) {
    const errorMessage = error.message || 'خطای ناشناخته در ورود';
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError 
} = authSlice.actions;

export default authSlice.reducer;