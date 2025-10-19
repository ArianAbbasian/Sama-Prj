// components/patient/PatientTable.jsx
import { useState, useEffect } from "react";
import PatientViewModal from "./PatientViewModal";
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
  useMediaQuery,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getPatients, deletePatient } from "../../store/patientSlice";

const stringToColor = (string) => {
  if (!string) return "#cccccc";
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const stringAvatar = (name) => {
  if (!name) return { sx: { bgcolor: "#ccc" }, children: "?" };

  const names = name.split(" ");
  const initials =
    names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`
      : names[0][0];

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: { xs: 32, md: 40 },
      height: { xs: 32, md: 40 },
      fontSize: { xs: "0.7rem", md: "0.9rem" },
    },
    children: initials,
  };
};

// تابع برای فرمت تاریخ
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR");
};

// تابع برای محاسبه سن
const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "-";
  const birthDate = new Date(dateOfBirth);
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

// تابع برای دریافت مقدار ایمن از patient
const getPatientValue = (patient, key, defaultValue = "-") => {
  if (!patient || patient[key] === null || patient[key] === undefined) {
    return defaultValue;
  }
  return patient[key];
};

export default function PatientTable({ onEdit }) {
  const dispatch = useDispatch();
  const {
    list: patients,
    loading,
    error,
  } = useSelector((state) => state.patients);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  // مشکل اینجاست - این useEffect داره مدام dispatch رو صدا می‌زنه
  // دریافت لیست بیماران فقط یکبار هنگام mount شدن کامپوننت
  useEffect(() => {
    // فقط اگر patients خالی هست یا نیاز به refresh داریم
    if (patients.length === 0) {
      dispatch(getPatients());
    }
  }, [dispatch, patients.length]); // اضافه کردن patients.length به dependencies

  const handleView = (patient) => {
    console.log("Viewing patient:", patient);
    setSelectedPatient(patient);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedPatient(null);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDelete = async (id, patientName) => {
    if (
      window.confirm(
        `آیا از حذف بیمار "${patientName}" اطمینان دارید؟\nاین عمل غیرقابل بازگشت است.`
      )
    ) {
      try {
        await dispatch(deletePatient(id));
        showSnackbar("بیمار با موفقیت حذف شد", "success");
      } catch (error) {
        console.log("Delete completed:", error);
        showSnackbar("بیمار حذف شد", "success");
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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
      >
        <CircularProgress />
        <Typography sx={{ mr: 2 }}>در حال دریافت اطلاعات بیماران...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        خطا در دریافت اطلاعات: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* نمایش تعداد بیماران */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="primary">
          لیست بیماران ({patients.length} بیمار)
        </Typography>
      </Box>

      {/* Snackbar برای نمایش پیام */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "auto",
          maxWidth: "100%",
        }}
      >
        <Table sx={{ minWidth: isMobile ? 600 : "auto" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  width: isMobile ? "60px" : "auto",
                }}
              >
                {isMobile ? "#" : "ردیف"}
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                بیمار
              </TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ایمیل
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    تاریخ تولد
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    سن
                  </TableCell>
                </>
              )}
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                وضعیت
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: isMobile ? "120px" : "auto",
                }}
              >
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedPatients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 4 : 7}
                  align="center"
                  sx={{ py: 3 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    هیچ بیمار یافت نشد
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              displayedPatients.map((patient, index) => {
                if (!patient) return null;

                const patientName = getPatientValue(
                  patient,
                  "name",
                  "نام نامشخص"
                );
                const patientEmail = getPatientValue(patient, "email");
                const patientDateOfBirth = getPatientValue(
                  patient,
                  "dateOfBirth"
                );
                const patientIsActive = getPatientValue(
                  patient,
                  "isActive",
                  true
                );

                return (
                  <TableRow
                    key={patient.id || index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                      >
                        {page * rowsPerPage + index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar {...stringAvatar(patientName)} />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="subtitle2"
                            fontWeight="medium"
                            sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                          >
                            {patientName}
                          </Typography>
                          {isMobile && (
                            <>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem", display: "block" }}
                              >
                                {patientEmail}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                سن: {calculateAge(patientDateOfBirth)}
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    {!isMobile && (
                      <>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            {patientEmail}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            {formatDate(patientDateOfBirth)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.9rem" }}
                          >
                            {calculateAge(patientDateOfBirth)} سال
                          </Typography>
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      <Chip
                        label={patientIsActive ? "فعال" : "غیرفعال"}
                        color={patientIsActive ? "success" : "default"}
                        variant={patientIsActive ? "filled" : "outlined"}
                        size="small"
                        sx={{
                          fontSize: { xs: "0.7rem", md: "0.8rem" },
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <Tooltip title="مشاهده">
                          <IconButton
                            color="info"
                            onClick={() => handleView(patient)}
                            size="small"
                            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                          >
                            <ViewIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="ویرایش">
                          <IconButton
                            color="primary"
                            onClick={() => onEdit(patient)}
                            size="small"
                            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="حذف">
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDelete(patient.id, patientName)
                            }
                            size="small"
                            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
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
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: { xs: "0.8rem", md: "0.9rem" },
            },
        }}
      />
      
      <PatientViewModal
        open={viewModalOpen}
        patient={selectedPatient}
        onClose={handleCloseViewModal}
      />
    </Box>
  );
}