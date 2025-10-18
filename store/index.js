 // '/store/index.js'

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import patientReducer from './mockPatientSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer, 
  },
});