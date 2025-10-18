// pages/index.jsx
import { useRouter } from 'next/router';
import { 
  Container, 
  Button, 
  Typography, 
  Box,
  Paper,
  Card,
  CardContent,
  Grid,
  useTheme
} from '@mui/material';
import { 
  Dashboard, 
  MedicalServices, 
  Security,
  People,
  Speed,
  Support,
  ArrowForward
} from '@mui/icons-material';
import HomeHeader from '../components/layout/HomeHeader';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const features = [
    {
      icon: <People sx={{ fontSize: { xs: 32, md: 40 } }} />,
      title: "مدیریت بیماران",
      description: "سیستم جامع مدیریت اطلاعات بیماران با قابلیت جستجو و فیلتر پیشرفته"
    },
    {
      icon: <Speed sx={{ fontSize: { xs: 32, md: 40 } }} />,
      title: "کارایی بالا",
      description: "طراحی بهینه شده برای عملکرد سریع و تجربه کاربری بی‌نظیر"
    },
    {
      icon: <Security sx={{ fontSize: { xs: 32, md: 40 } }} />,
      title: "امنیت اطلاعات",
      description: "حفاظت از داده‌های حساس بیماران با استانداردهای امنیتی بالا"
    },
    {
      icon: <Support sx={{ fontSize: { xs: 32, md: 40 } }} />,
      title: "پشتیبانی کامل",
      description: "پشتیبانی فنی دائمی برای پاسخگویی به نیازهای شما"
    }
  ];

  return (
    <>
      <HomeHeader />
      <Box 
        sx={{ 
          minHeight: '100vh',
          height: '100vh',
          maxHeight: '100vh',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #0c2461 0%, #1e3799 50%, #0c2461 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            py: { xs: 8, md: 4 }
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={4} alignItems="center" sx={{ height: '100%' }}>
              {/* بخش متن و CTA */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  textAlign: { xs: 'center', md: 'right' },
                  color: 'white',
                  mb: { xs: 4, md: 0 }
                }}>
                  <MedicalServices 
                    sx={{ 
                      fontSize: { xs: 60, md: 80 },
                      mb: 2,
                      display: { xs: 'block', md: 'none' }
                    }} 
                  />
                  
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      lineHeight: 1.2
                    }}
                  >
                    سامانه مدیریت سلامت
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      mb: 3,
                      opacity: 0.9,
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      lineHeight: 1.5
                    }}
                  >
                    راه‌حل هوشمند برای مدیریت اطلاعات پزشکی و بیماران
                  </Typography>

                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.8,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      lineHeight: 1.7,
                      display: { xs: 'none', md: 'block' }
                    }}
                  >
                    با استفاده از جدیدترین تکنولوژی‌های روز، سیستمی قدرتمند و کاربرپسند 
                    برای مدیریت کامل اطلاعات بیماران و بهبود کیفیت خدمات پزشکی ارائه می‌دهیم.
                  </Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={goToDashboard}
                    sx={{ 
                      py: { xs: 1.5, md: 2 },
                      px: { xs: 3, md: 4 },
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      borderRadius: 3,
                      boxShadow: 6,
                      minWidth: { xs: '200px', md: '240px' },
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 8
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    شروع کنید
                  </Button>
                </Box>
              </Grid>

              {/* بخش تصویر/آیکون */}
              <Grid item xs={12} md={6}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                  }}
                >
                  <MedicalServices 
                    sx={{ 
                      fontSize: { xs: 150, sm: 200, md: 250, lg: 300 },
                      color: 'rgba(255,255,255,0.1)',
                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                      display: { xs: 'none', md: 'block' }
                    }} 
                  />
                </Box>
              </Grid>
            </Grid>

            {/* ویژگی‌ها - در پایین صفحه */}
            <Grid container spacing={3} sx={{ mt: { xs: 2, md: 4 } }}>
              {features.map((feature, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        background: 'rgba(255,255,255,0.15)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      textAlign: 'center', 
                      p: { xs: 2, md: 3 },
                      '&:last-child': { pb: { xs: 2, md: 3 } }
                    }}>
                      <Box sx={{ color: 'white', mb: 1 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        opacity: 0.9, 
                        lineHeight: 1.4,
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                        display: { xs: 'none', sm: 'block' }
                      }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* اطلاعات پایین صفحه */}
            <Paper 
              sx={{ 
                mt: 3,
                p: { xs: 2, md: 3 },
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                نسخه نمایشی - سیستم احراز هویت در این نسخه غیرفعال می‌باشد
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}