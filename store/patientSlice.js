//  '/services/patientService.js'

import { createSlice } from '@reduxjs/toolkit';
import { patientService } from '../services/patientService';

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    list: [],
    selectedPatient: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Start loading
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Get all patients success
    getPatientsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.error = null;
    },
    
    // Get patient by ID success
    getPatientSuccess: (state, action) => {
      state.loading = false;
      state.selectedPatient = action.payload;
      state.error = null;
    },
    
    // Create patient success
    createPatientSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
      state.error = null;
    },
    
    // Update patient success
    updatePatientSuccess: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(patient => patient.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      state.error = null;
    },
    
    // Delete patient success
    deletePatientSuccess: (state, action) => {
      state.loading = false;
      state.list = state.list.filter(patient => patient.id !== action.payload);
      state.error = null;
    },
    
    // Operation failure
    operationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Clear selected patient
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
    },
  },
});

// Async actions
export const getPatients = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const patients = await patientService.getPatients();
    dispatch(getPatientsSuccess(patients));
  } catch (error) {
    dispatch(operationFailure(error.message));
  }
};

export const createPatient = (patientData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const newPatient = await patientService.createPatient(patientData);
    dispatch(createPatientSuccess(newPatient));
    return newPatient;
  } catch (error) {
    dispatch(operationFailure(error.message));
    throw error;
  }
};

export const updatePatient = (id, patientData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const updatedPatient = await patientService.updatePatient(id, patientData);
    dispatch(updatePatientSuccess(updatedPatient));
    return updatedPatient;
  } catch (error) {
    dispatch(operationFailure(error.message));
    throw error;
  }
};

export const deletePatient = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await patientService.deletePatient(id);
    dispatch(deletePatientSuccess(id));
  } catch (error) {
    dispatch(operationFailure(error.message));
    throw error;
  }
};

export const { 
  startLoading, 
  getPatientsSuccess, 
  getPatientSuccess, 
  createPatientSuccess, 
  updatePatientSuccess, 
  deletePatientSuccess, 
  operationFailure, 
  clearError,
  clearSelectedPatient
} = patientSlice.actions;

export default patientSlice.reducer;