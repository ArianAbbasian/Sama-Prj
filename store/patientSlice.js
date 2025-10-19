// store/patientSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { patientService } from "../services/patientService";

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    selectedPatient: null,
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null; // خطای قبلی رو پاک کن
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

// Async actions
export const getPatients = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const patients = await patientService.getPatients();
    dispatch(getPatientsSuccess(patients));
    return { success: true, data: patients };
  } catch (error) {
    dispatch(operationFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const createPatient = (patientData) => async (dispatch) => {
  try {
    dispatch(startLoading());

    console.log("Creating patient in slice...");

    // اول بیمار رو ایجاد کن
    await patientService.createPatient(patientData);

    console.log("Patient created, fetching updated list...");

    // سپس لیست کامل رو مجدد بگیر
    const patients = await patientService.getPatients();

    console.log("Updated patients list received:", patients);

    dispatch(getPatientsSuccess(patients));
    return {
      success: true,
      data: patients,
      message: "بیمار با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("Create patient error in slice:", error);
    const errorMessage = error.message || "خطا در ایجاد بیمار جدید";
    dispatch(operationFailure(errorMessage));
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const updatePatient = (patientData) => async (dispatch) => {
  try {
    dispatch(startLoading());

    console.log("Updating patient in slice - full data:", patientData);
    console.log("Patient ID:", patientData.id);
    console.log("Update data:", patientData);

    // اعتبارسنجی داده‌ها
    if (!patientData || !patientData.id) {
      throw new Error("داده‌های بیمار نامعتبر است");
    }

    if (!patientData.name || !patientData.email || !patientData.dateOfBirth) {
      throw new Error("تمامی فیلدهای الزامی باید پر شوند");
    }

    // اول بیمار رو آپدیت کن
    await patientService.updatePatient(patientData.id, {
      name: patientData.name,
      email: patientData.email,
      dateOfBirth: patientData.dateOfBirth,
      isActive: patientData.isActive,
    });

    console.log("Patient updated, fetching updated list...");

    // سپس لیست کامل رو مجدد بگیر
    const patients = await patientService.getPatients();

    console.log("Updated patients list after edit:", patients);

    dispatch(getPatientsSuccess(patients));
    return {
      success: true,
      data: patients,
      message: "اطلاعات بیمار با موفقیت ویرایش شد",
    };
  } catch (error) {
    console.error("Update patient error in slice:", error);
    const errorMessage = error.message || "خطا در ویرایش اطلاعات بیمار";
    dispatch(operationFailure(errorMessage));
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const deletePatient = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    console.log("Deleting patient in slice, ID:", id);

    // اول بیمار رو حذف کن
    const deleteResult = await patientService.deletePatient(id);
    console.log("Delete service result:", deleteResult);

    console.log("Patient deleted, fetching updated list...");

    // سپس لیست کامل رو مجدد بگیر
    const patients = await patientService.getPatients();

    console.log("Updated patients list after deletion:", patients);

    dispatch(getPatientsSuccess(patients));
    return {
      success: true,
      data: patients,
      message: deleteResult.message,
    };
  } catch (error) {
    console.error("Delete patient error in slice:", error);
    const errorMessage = error.message || "خطای ناشناخته در حذف بیمار";
    dispatch(operationFailure(errorMessage));
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const {
  startLoading,
  getPatientsSuccess,
  getPatientSuccess,
  operationFailure,
  clearError,
  clearSelectedPatient,
} = patientSlice.actions;

export default patientSlice.reducer;
