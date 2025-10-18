//  '/services/patientService.js'

import api from './api';

export const patientService = {
  // GET all patients
  getPatients: async () => {
    const response = await api.get('/Interview/Patient');
    return response.data;
  },

  // GET patient by ID
  getPatientById: async (id) => {
    const response = await api.get(`/Interview/Patient/${id}`);
    return response.data;
  },

  // CREATE new patient
  createPatient: async (patientData) => {
    const response = await api.post('/Interview/Patient', patientData);
    return response.data;
  },

  // UPDATE patient
  updatePatient: async (id, patientData) => {
    const response = await api.put(`/Interview/Patient/${id}`, patientData);
    return response.data;
  },

  // DELETE patient
  deletePatient: async (id) => {
    const response = await api.delete(`/Interview/Patient/${id}`);
    return response.data;
  },
};