// components/layout/HomeHeader.js
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Box,
  Button
} from '@mui/material';
import { Brightness4, Brightness7, Dashboard } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useTheme } from '../../contexts/ThemeContext';
import { getToken } from '../../services/api';

export default function HomeHeader() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const token = getToken();

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <AppBar 
      position="absolute" 
      elevation={0} 
      sx={{ 
        background: 'transparent',
        boxShadow: 'none'
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right', color: 'white' }}>
          سامانه سلامت
        </Typography>
        
        <Box display="flex" alignItems="center" gap={1}>
          
          {token && (
            <Button
              color="inherit"
              startIcon={<Dashboard />}
              onClick={goToDashboard}
              sx={{ 
                color: 'white',
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              پنل مدیریت
            </Button>
          )}

         
          <IconButton
            color="inherit"
            onClick={toggleDarkMode}
            sx={{ color: 'white' }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}