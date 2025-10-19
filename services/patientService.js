// services/patientService.js
import api from "./api";

export const patientService = {
  // GET all patients
  getPatients: async () => {
    try {
      console.log("Fetching patients from API...");
      const response = await api.get("/Interview/Patient");
      console.log("Patients API response:", response.data);

      if (response.data && response.data.isSuccessed) {
        return response.data.result || [];
      } else {
        throw new Error(response.data?.message || "خطا در دریافت لیست بیماران");
      }
    } catch (error) {
      console.error("Get Patients Error:", error);
      throw error;
    }
  },

  // GET patient by ID
  getPatientById: async (id) => {
    try {
      const response = await api.get(`/Interview/Patient/${id}`);

      if (response.data && response.data.isSuccessed) {
        return response.data.result;
      } else {
        throw new Error(
          response.data?.message || "خطا در دریافت اطلاعات بیمار"
        );
      }
    } catch (error) {
      console.error("Get Patient Error:", error);
      throw error;
    }
  },

  // CREATE new patient
  createPatient: async (patientData) => {
    try {
      console.log("Creating patient with data:", patientData);

      // اعتبارسنجی اضافی در سمت کلاینت
      const birthDate = new Date(patientData.dateOfBirth);
      const today = new Date();

      if (birthDate > today) {
        throw new Error("تاریخ تولد نمی‌تواند از امروز بیشتر باشد");
      }

      const age = today.getFullYear() - birthDate.getFullYear();
      if (age > 150) {
        throw new Error("سن بیمار باید کمتر از 150 سال باشد");
      }

      if (age < 1) {
        throw new Error("سن بیمار باید حداقل 1 سال باشد");
      }

      // فرمت تاریخ برای API - باید به صورت ISO string باشه
      const formattedData = {
        name: patientData.name,
        email: patientData.email,
        dateOfBirth: birthDate.toISOString(),
      };

      console.log("Formatted data for API:", formattedData);

      const response = await api.post("/Interview/Patient", formattedData);
      console.log("Create patient API response:", response.data);

      if (response.data && response.data.isSuccessed) {
        console.log("Patient creation successful");
        return response.data.result;
      } else {
        const errorMessage =
          response.data?.message || "خطا در ایجاد بیمار جدید";
        console.error("API returned error:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Create Patient Error:", error);

      // خطای دقیق‌تر برگردون
      if (error.response) {
        throw new Error(
          `خطای سرور: ${error.response.status} - ${
            error.response.data?.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        throw new Error("پاسخی از سرور دریافت نشد");
      } else {
        throw new Error(error.message);
      }
    }
  },

  // UPDATE patient
  updatePatient: async (id, patientData) => {
    try {
      console.log("🎯 UPDATE PATIENT - Debug Info:");
      console.log("Patient ID:", id);
      console.log("Full patientData:", patientData);
      console.log("isActive value:", patientData.isActive);
      console.log("isActive type:", typeof patientData.isActive);

      // اعتبارسنجی داده‌های ورودی
      if (!patientData) {
        throw new Error("داده‌های بیمار ارائه نشده است");
      }

      if (!patientData.name || !patientData.email || !patientData.dateOfBirth) {
        throw new Error("تمامی فیلدهای الزامی باید پر شوند");
      }

      // تست ساختارهای مختلف برای isActive
      const formattedData = {
        name: patientData.name,
        email: patientData.email,
        dateOfBirth: new Date(patientData.dateOfBirth).toISOString(),
        isActive: patientData.isActive, // همینطور که هست
      };

      console.log("📤 Data being sent to API:", formattedData);

      const response = await api.put(`/Interview/Patient/${id}`, formattedData);
      console.log("📥 API Response:", response.data);

      if (response.data && response.data.isSuccessed) {
        console.log("✅ Patient updated successfully");
        return response.data.result;
      } else {
        const errorMessage =
          response.data?.message || "خطا در ویرایش اطلاعات بیمار";
        console.error("❌ API returned error:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("💥 Update Patient Error:", error);

      // خطای دقیق‌تر برگردون
      if (error.response) {
        console.error("Response error details:", error.response);
        if (error.response.status === 404) {
          throw new Error("بیمار مورد نظر یافت نشد");
        }
        throw new Error(
          `خطای سرور: ${error.response.status} - ${
            error.response.data?.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        throw new Error("پاسخی از سرور دریافت نشد");
      } else {
        throw new Error(error.message);
      }
    }
  },

  // DELETE patient
  deletePatient: async (id) => {
    try {
      console.log("Deleting patient with ID:", id);

      const response = await api.delete(`/Interview/Patient/${id}`);
      console.log("Delete patient API response:", response.data);

      if (response.data && response.data.isSuccessed) {
        console.log("Patient deleted successfully");
        return {
          success: true,
          message: response.data.message || "بیمار با موفقیت حذف شد",
          data: response.data,
        };
      } else {
        const errorMessage = response.data?.message || "خطا در حذف بیمار";
        console.error("API returned error:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Delete Patient Error:", error);

      // خطای دقیق‌تر برگردون
      let finalErrorMessage = "خطا در حذف بیمار";

      if (error.response) {
        if (error.response.status === 404) {
          finalErrorMessage = "بیمار مورد نظر یافت نشد";
        } else if (error.response.status === 401) {
          finalErrorMessage = "دسترسی غیرمجاز - لطفا مجدد وارد شوید";
        } else if (error.response.status === 500) {
          finalErrorMessage = "خطای سرور - لطفا بعدا تلاش کنید";
        } else {
          finalErrorMessage = `خطای سرور: ${error.response.status} - ${
            error.response.data?.message || error.response.statusText
          }`;
        }
      } else if (error.request) {
        finalErrorMessage =
          "پاسخی از سرور دریافت نشد - اتصال اینترنت را بررسی کنید";
      } else {
        finalErrorMessage = error.message || "خطای ناشناخته در حذف بیمار";
      }

      console.error("Final error message:", finalErrorMessage);
      throw new Error(finalErrorMessage);
    }
  },
};
