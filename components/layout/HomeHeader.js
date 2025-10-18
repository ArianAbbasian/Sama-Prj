// components/layout/HomeHeader.js
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Box
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

export default function HomeHeader() {
  const { darkMode, toggleDarkMode } = useTheme();

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
          {/* دکمه تغییر تم */}
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