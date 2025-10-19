// pages/dashboard/patient-management/index.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { Add as AddIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import Layout from "../../../components/layout/Layout";
import PatientTable from "../../../components/patient/PatientTable";
import PatientForm from "../../../components/patient/PatientForm";
import DashboardLoading from "../../../components/layout/DashboardLoading";
import { getPatients, clearError } from "../../../store/patientSlice";

export default function PatientManagement() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { action } = router.query;
  const { loading, error } = useSelector((state) => state.patients);
  const [localLoading, setLocalLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);


  useEffect(() => {
  dispatch(getPatients()).finally(() => {
    setLocalLoading(false);
  });
}, [dispatch]);


  useEffect(() => {
    if (action === "create") {
      setFormOpen(true);

      router.replace("/dashboard/patient-management", undefined, {
        shallow: true,
      });
    }
  }, [action, router]);

  const handleCreate = () => {
    setSelectedPatient(null);
    setFormOpen(true);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedPatient(null);
  };

  const handleRefresh = () => {
    dispatch(getPatients());
  };


  if (loading || localLoading) {
    return (
      <Layout>
        <DashboardLoading />
      </Layout>
    );
  }

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          mt: { xs: 2, md: 4 },
          mb: 4,
          width: "100%",
          maxWidth: "none !important",
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >
              مدیریت بیماران
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}
            >
              مشاهده و مدیریت اطلاعات بیماران
            </Typography>
          </Box>

          <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              size="large"
            >
              بروزرسانی
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
              size="large"
            >
              افزودن بیمار جدید
            </Button>
          </Box>
        </Box>


        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

 
        <Paper
          elevation={0}
          sx={{ p: { xs: 1, md: 2 }, backgroundColor: "transparent" }}
        >
          <PatientTable onEdit={handleEdit} />
        </Paper>


        <PatientForm
          open={formOpen}
          patient={selectedPatient}
          onClose={handleFormClose}
        />
      </Container>
    </Layout>
  );
}
