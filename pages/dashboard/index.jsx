// pages/dashboard/index.jsx
import { useState, useEffect } from 'react'; // اضافه کردن useState
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { 
  People, 
  Add, 
  List, 
  Dashboard as DashboardIcon 
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import DashboardLoading from '../../components/layout/DashboardLoading';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی لودینگ داده‌ها
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    {
      title: 'مدیریت بیماران',
      description: 'مشاهده و مدیریت لیست بیماران',
      icon: <People sx={{ fontSize: { xs: 30, md: 40 } }} />,
      action: () => router.push('/dashboard/patient-management'),
      color: 'primary'
    },
    {
      title: 'افزودن بیمار جدید',
      description: 'ثبت اطلاعات بیمار جدید در سیستم',
      icon: <Add sx={{ fontSize: { xs: 30, md: 40 } }} />,
      action: () => router.push('/dashboard/patient-management?action=create'),
      color: 'secondary'
    },
    {
      title: 'نمایش لیست',
      description: 'مشاهده کامل لیست بیماران',
      icon: <List sx={{ fontSize: { xs: 30, md: 40 } }} />,
      action: () => router.push('/dashboard/patient-management'),
      color: 'success'
    }
  ];

  if (loading) {
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
          width: '100%',
          maxWidth: 'none !important',
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        {/* هدر دشبورد */}
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <DashboardIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main' }} />
          <Box flex={1}>
            <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
              پنل مدیریت
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
              به سیستم مدیریت سلامت خوش آمدید
            </Typography>
          </Box>
        </Box>

        {/* کارت‌های اقدامات سریع */}
        <Grid container spacing={2} mb={4}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
                onClick={action.action}
              >
                <CardContent sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
                  <Box sx={{ color: `${action.color}.main`, mb: 1 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* اطلاعات سیستم */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, md: 3 }, 
            backgroundColor: (theme) => theme.palette.background.paper,
            width: '100%'
          }}
        >
          <Typography variant="h6" gutterBottom color="primary" sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
            وضعیت سیستم
          </Typography>
          <Box sx={{ pl: 2 }}>
            {[
              'سیستم مدیریت بیماران فعال است',
              'داده‌ها به صورت Real-time به‌روز می‌شوند',
              'امکان افزودن، ویرایش و حذف بیماران وجود دارد',
              'حالت تاریک/روشن فعال است',
              'رابط کاربری کاملاً ریسپانسیو است',
              'دکمه Login و LogOut به درستی و واقعی کار میکنند'
            ].map((text, index) => (
              <Typography key={index} variant="body2" color="text.secondary" paragraph sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                • {text}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}