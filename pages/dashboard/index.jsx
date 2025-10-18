// pages/dashboard/index.jsx
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

export default function Dashboard() {
  const router = useRouter();

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
              حالت طراحی - سیستم احراز هویت غیرفعال است
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
              'سیستم در حال حاضر در حالت طراحی قرار دارد',
              'تمامی داده‌ها به صورت Mock و تستی هستند',
              'امکان افزودن، ویرایش و حذف بیماران وجود دارد',
              'حالت تاریک/روشن فعال است',
              'سایدبار قابل باز و بسته شدن است'
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