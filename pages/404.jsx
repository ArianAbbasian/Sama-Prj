// pages/404.jsx
import { Container, Typography, Box, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        gap={3}
      >
        <Typography variant="h1" component="h1" fontWeight="bold" color="primary">
          ۴۰۴
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          صفحه مورد نظر یافت نشد
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => router.push('/')}
          size="large"
        >
          بازگشت به صفحه اصلی
        </Button>
      </Box>
    </Container>
  );
}