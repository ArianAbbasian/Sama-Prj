// components/patient/PatientViewModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import {
  Person,
  Email,
  Cake,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

const stringToColor = (string) => {
  if (!string) return '#cccccc';
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const stringAvatar = (name) => {
  if (!name) return { sx: { bgcolor: '#ccc' }, children: '?' };
  
  const names = name.split(' ');
  const initials = names.length > 1 
    ? `${names[0][0]}${names[names.length - 1][0]}`
    : names[0][0];
    
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 80,
      height: 80,
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    children: initials,
  };
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('fa-IR');
};

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return '-';
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export default function PatientViewModal({ open, patient, onClose }) {
  if (!patient) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar {...stringAvatar(patient.name)} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {patient.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              مشاهده اطلاعات بیمار
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
         
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Person color="primary" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  نام کامل
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {patient.name}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Email color="primary" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  آدرس ایمیل
                </Typography>
                <Typography variant="body1">
                  {patient.email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Cake color="primary" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  تاریخ تولد
                </Typography>
                <Typography variant="body1">
                  {formatDate(patient.dateOfBirth)} 
                  <Typography component="span" variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    ({calculateAge(patient.dateOfBirth)} سال)
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              {patient.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  وضعیت
                </Typography>
                <Chip
                  label={patient.isActive ? 'فعال' : 'غیرفعال'}
                  color={patient.isActive ? 'success' : 'default'}
                  variant={patient.isActive ? 'filled' : 'outlined'}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>

    
          <Grid item xs={12}>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                شناسه بیمار: 
              </Typography>
              <Typography variant="caption" fontFamily="monospace">
                {patient.id}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
}