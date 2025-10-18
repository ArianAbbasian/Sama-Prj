// services/mockPatientService.js
import { mockPatients } from '../utils/mockData';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


let patientsData = [...mockPatients];

export const mockPatientService = {
  getPatients: async () => {
    await delay(800);
    return [...patientsData]; // return a copy
  },

  getPatientById: async (id) => {
    await delay(500);
    const patient = patientsData.find(p => p.id === id);
    if (!patient) throw new Error('بیمار یافت نشد');
    return { ...patient }; // return a copy
  },

  createPatient: async (patientData) => {
    await delay(700);
    const newPatient = {
      id: Math.max(...patientsData.map(p => p.id)) + 1,
      ...patientData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    patientsData.push(newPatient);
    return { ...newPatient }; // return a copy
  },

  updatePatient: async (id, patientData) => {
    await delay(600);
    const index = patientsData.findIndex(p => p.id === id);
    if (index === -1) throw new Error('بیمار یافت نشد');
    
    patientsData[index] = { ...patientsData[index], ...patientData };
    return { ...patientsData[index] }; // return a copy
  },

  deletePatient: async (id) => {
    await delay(500);
    const index = patientsData.findIndex(p => p.id === id);
    if (index === -1) throw new Error('بیمار یافت نشد');
    
    const deletedPatient = patientsData[index];
    patientsData.splice(index, 1);
    return { message: 'بیمار با موفقیت حذف شد', deletedPatient };
  }
};