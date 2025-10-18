// components/patient/PatientForm.jsx
import { useState, useEffect } from 'react';
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
  CircularProgress
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createPatient, updatePatient } from '../../store/patientSlice';

export default function PatientForm({ open, patient, onClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    nationalCode: '',
    mobileNumber: '',
    isActive: true
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        fullName: patient.fullName || '',
        nationalCode: patient.nationalCode || '',
        mobileNumber: patient.mobileNumber || '',
        isActive: patient.isActive !== undefined ? patient.isActive : true
      });
    } else {
      setFormData({
        fullName: '',
        nationalCode: '',
        mobileNumber: '',
        isActive: true
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (patient) {
        await dispatch(updatePatient({ id: patient.id, ...formData })).unwrap();
      } else {
        await dispatch(createPatient(formData)).unwrap();
      }
      onClose();
    } catch (error) {
      alert('خطا در ذخیره اطلاعات بیمار');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {patient ? 'ویرایش بیمار' : 'ایجاد بیمار جدید'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام کامل"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="کد ملی"
                name="nationalCode"
                value={formData.nationalCode}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="شماره تلفن"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
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
                label="فعال"
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
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {patient ? 'ویرایش' : 'ایجاد'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}