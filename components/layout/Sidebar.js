// components/layout/Sidebar.js
import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  IconButton,
  Box
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  List as ListIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';

export default function Sidebar({ onMobileClose }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#2c3e50',
      color: 'white'
    }}>
     
      {onMobileClose && (
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" fontWeight="bold">
            منو
          </Typography>
          <IconButton 
            onClick={onMobileClose}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      
      <Box sx={{ flexGrow: 1, p: onMobileClose ? 1 : 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('/dashboard')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="دشبورد" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 1, bgcolor: 'rgba(255,255,255,0.2)' }} />

          <ListItem disablePadding>
            <ListItemButton onClick={handleToggle}>
              <ListItemIcon sx={{ color: 'white' }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="مدیریت بیماران" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => handleNavigation('/dashboard/patient-management')}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="نمایش لیست" />
              </ListItemButton>
              
              <ListItemButton 
                sx={{ pl: 4 }}
                onClick={() => handleNavigation('/dashboard/patient-management?action=create')}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="افزودن بیمار جدید" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Box>
  );
}