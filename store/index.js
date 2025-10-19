// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import patientReducer from './patientSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
  },
});