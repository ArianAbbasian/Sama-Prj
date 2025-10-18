// components/layout/Layout.js
import { useState } from 'react';
import { 
  Box, 
  Drawer,
  useMediaQuery
} from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 280;

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 900px)');

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onDrawerToggle={handleDrawerToggle} />

      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: desktopOpen ? drawerWidth : 0,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          display: { xs: 'none', md: 'block' },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            right: desktopOpen ? 0 : `-${drawerWidth}px`,
            top: '64px',
            width: drawerWidth,
            height: 'calc(100vh - 64px)',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#2c3e50',
            color: 'white',
            transition: 'right 0.3s ease',
            borderLeft: '1px solid',
            borderColor: 'divider',
            overflowY: 'auto',
            zIndex: 1200,
          }}
        >
          <Sidebar />
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: { xs: '100%', sm: drawerWidth },
            right: 0,
            left: 'auto !important',
          },
        }}
        anchor="right"
      >
        <Sidebar onMobileClose={handleMobileClose} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { 
            xs: '100%', 
            md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : '100%' 
          },
          marginTop: '64px',
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: (theme) => theme.palette.background.default,
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}