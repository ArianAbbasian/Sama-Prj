// components/patient/PatientTable.jsx
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TablePagination,
  Box,
  Paper,
  Avatar,
  Typography,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deletePatient } from '../../store/mockPatientSlice';

const stringToColor = (string) => {
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
  const names = name.split(' ');
  const initials = names.length > 1 
    ? `${names[0][0]}${names[names.length - 1][0]}`
    : names[0][0];
    
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: { xs: 32, md: 40 },
      height: { xs: 32, md: 40 },
      fontSize: { xs: '0.7rem', md: '0.9rem' }
    },
    children: initials,
  };
};

export default function PatientTable({ patients, onEdit, loading }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleDelete = async (id, patientName) => {
    if (window.confirm(`آیا از حذف بیمار "${patientName}" اطمینان دارید؟`)) {
      try {
        await dispatch(deletePatient(id)).unwrap();
      } catch (error) {
        alert('خطا در حذف بیمار');
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedPatients = patients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer 
        component={Paper} 
        elevation={2}
        sx={{ 
          borderRadius: 2,
          overflow: 'auto',
          maxWidth: '100%'
        }}
      >
        <Table sx={{ minWidth: isMobile ? 600 : 'auto' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: isMobile ? '80px' : 'auto' }}>
                {isMobile ? '#' : 'شناسه'}
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>بیمار</TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>کد ملی</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تلفن همراه</TableCell>
                </>
              )}
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>وضعیت</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', width: isMobile ? '120px' : 'auto' }}>
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedPatients.map((patient, index) => (
              <TableRow 
                key={patient.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
              >
                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                    {page * rowsPerPage + index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar {...stringAvatar(patient.fullName)} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" fontWeight="medium" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                        {patient.fullName}
                      </Typography>
                      {isMobile && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          {patient.nationalCode}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>
                {!isMobile && (
                  <>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace" sx={{ fontSize: '0.9rem' }}>
                        {patient.nationalCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                        {patient.mobileNumber}
                      </Typography>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <Chip
                    label={patient.isActive ? 'فعال' : 'غیرفعال'}
                    color={patient.isActive ? 'success' : 'default'}
                    variant={patient.isActive ? 'filled' : 'outlined'}
                    size="small"
                    sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="center" gap={0.5}>
                    <Tooltip title="مشاهده">
                      <IconButton color="info" size="small" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        <ViewIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="ویرایش">
                      <IconButton 
                        color="primary" 
                        onClick={() => onEdit(patient)}
                        size="small"
                        sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="حذف">
                      <IconButton 
                        color="error" 
                        onClick={() => handleDelete(patient.id, patient.fullName)}
                        size="small"
                        sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="تعداد در هر صفحه:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} از ${count}`
        }
        sx={{ 
          mt: 2,
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            fontSize: { xs: '0.8rem', md: '0.9rem' }
          }
        }}
      />
    </Box>
  );
}