// store/mockPatientSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { mockPatientService } from '../services/mockPatientService';

const mockPatientSlice = createSlice({
  name: 'patients',
  initialState: {
    list: [],
    selectedPatient: null,
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPatientsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.error = null;
    },
    getPatientSuccess: (state, action) => {
      state.loading = false;
      state.selectedPatient = action.payload;
      state.error = null;
    },
    createPatientSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
      state.error = null;
    },
    updatePatientSuccess: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(patient => patient.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      state.error = null;
    },
    deletePatientSuccess: (state, action) => {
      state.loading = false;
      state.list = state.list.filter(patient => patient.id !== action.payload);
      state.error = null;
    },
    operationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
    },
  },
});

// Async actions با mock
export const getPatients = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const patients = await mockPatientService.getPatients();
    dispatch(getPatientsSuccess(patients));
  } catch (error) {
    dispatch(operationFailure(error.message));
  }
};

export const createPatient = (patientData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const newPatient = await mockPatientService.createPatient(patientData);
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
    const updatedPatient = await mockPatientService.updatePatient(id, patientData);
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
    await mockPatientService.deletePatient(id);
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
} = mockPatientSlice.actions;

export default mockPatientSlice.reducer;