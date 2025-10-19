// components/patient/PatientForm.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatient,
  updatePatient,
  clearError,
} from "../../store/patientSlice";

export default function PatientForm({ open, patient, onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.patients);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    isActive: true,
  });
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (patient) {
      console.log("Editing patient:", patient);

      // فرمت تاریخ برای input type="date" - تبدیل از ISO به YYYY-MM-DD
      let formattedDate = "";
      if (patient.dateOfBirth) {
        // اگر تاریخ به صورت ISO string هست
        if (patient.dateOfBirth.includes("T")) {
          formattedDate = patient.dateOfBirth.split("T")[0];
        } else {
          // اگر فرمت دیگه‌ای داره
          formattedDate = patient.dateOfBirth;
        }
      }

      console.log("Formatted date for edit:", formattedDate);

      setFormData({
        name: patient.name || "",
        email: patient.email || "",
        dateOfBirth: formattedDate,
        isActive: patient.isActive !== undefined ? patient.isActive : true,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        dateOfBirth: "",
        isActive: true,
      });
    }
    setFormError("");
    setFieldErrors({ name: "", email: "", dateOfBirth: "" });
  }, [patient, open]);

  // اعتبارسنجی ایمیل
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // اعتبارسنجی تاریخ تولد
  const validateDateOfBirth = (dateString) => {
    if (!dateString)
      return { isValid: false, message: "تاریخ تولد الزامی است" };

    // چک کردن فرمت YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return { isValid: false, message: "فرمت تاریخ باید YYYY-MM-DD باشد" };
    }

    const inputDate = new Date(dateString);
    const today = new Date();

    // چک کردن اینکه تاریخ معتبر هست
    if (isNaN(inputDate.getTime())) {
      return { isValid: false, message: "تاریخ نامعتبر است" };
    }

    // چک کردن اینکه تاریخ از امروز بیشتر نباشه
    if (inputDate > today) {
      return {
        isValid: false,
        message: "تاریخ تولد نمی‌تواند از امروز بیشتر باشد",
      };
    }

    // چک کردن سن منطقی (مثلاً بیشتر از 150 سال نباشه)
    const age = today.getFullYear() - inputDate.getFullYear();
    if (age > 150) {
      return { isValid: false, message: "سن بیمار باید کمتر از 150 سال باشد" };
    }

    // چک کردن سن منطقی (مثلاً کمتر از 1 سال نباشه)
    if (age < 1) {
      return { isValid: false, message: "سن بیمار باید حداقل 1 سال باشد" };
    }

    return { isValid: true, message: "" };
  };

  // اعتبارسنجی بلادرنگ فیلدها
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return "نام بیمار الزامی است";
        }
        if (value.trim().length < 2) {
          return "نام باید حداقل ۲ حرف داشته باشد";
        }
        return "";

      case "email":
        if (!value.trim()) {
          return "ایمیل الزامی است";
        }
        if (!validateEmail(value)) {
          return "فرمت ایمیل نامعتبر است";
        }
        return "";

      case "dateOfBirth":
        return validateDateOfBirth(value).message;

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // اعتبارسنجی بلادرنگ
    const error = validateField(name, newValue);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // پاک کردن خطای کلی هنگام تغییر فیلد
    if (formError) setFormError("");
  };

  const validateForm = () => {
    const errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      dateOfBirth: validateField("dateOfBirth", formData.dateOfBirth),
    };

    setFieldErrors(errors);

    // چک کردن اگر هیچ خطایی وجود نداره
    const hasErrors = Object.values(errors).some((error) => error !== "");
    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log("Submitting form...");
      console.log("Form data:", formData);
      console.log("Patient being edited:", patient);

      setFormError("");
      dispatch(clearError());

      let result;
      if (patient) {
        console.log("Updating patient with ID:", patient.id);
        console.log("Update data to send:", { id: patient.id, ...formData });

        result = await dispatch(
          updatePatient({
            id: patient.id,
            name: formData.name,
            email: formData.email,
            dateOfBirth: formData.dateOfBirth,
            isActive: formData.isActive,
          })
        );
      } else {
        console.log("Creating new patient");
        result = await dispatch(createPatient(formData));
      }

      console.log("Dispatch result:", result);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError("خطا در ذخیره اطلاعات بیمار");
    }
  };

  // محاسبه سن برای نمایش به کاربر
  const calculateAge = (dateString) => {
    if (!dateString) return null;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(formData.dateOfBirth);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {patient ? "ویرایش بیمار" : "ایجاد بیمار جدید"}
        </DialogTitle>
        <DialogContent>
          {/* نمایش خطاها */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام کامل"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={!!fieldErrors.name}
                helperText={fieldErrors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ایمیل"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="تاریخ تولد"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={!!fieldErrors.dateOfBirth}
                helperText={
                  fieldErrors.dateOfBirth ||
                  (age !== null ? `سن: ${age} سال` : "فرمت: YYYY-MM-DD")
                }
                inputProps={{
                  max: new Date().toISOString().split("T")[0], // حداکثر تاریخ امروز
                  min: new Date(new Date().getFullYear() - 150, 0, 1)
                    .toISOString()
                    .split("T")[0], // حداقل 150 سال پیش
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={formData.isActive ? "فعال" : "غیرفعال"}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            انصراف
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              loading ||
              Object.values(fieldErrors).some((error) => error !== "")
            }
            startIcon={loading && <CircularProgress size={20} />}
          >
            {patient ? "ویرایش" : "ایجاد"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
