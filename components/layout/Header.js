// components/layout/Header.js
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  ExitToApp,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useTheme } from "../../contexts/ThemeContext";
import { logout } from "../../store/authSlice";
import { removeToken } from "../../services/api";

export default function Header({ onDrawerToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
    removeToken();
    dispatch(logout());
    handleClose();

    
    router.push("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        right: 0,
        left: "auto !important",
      }}
    >
      <Toolbar>
        
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerToggle}
          edge="start"
          sx={{
            ml: 2,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "right" }}
        >
          سامانه سلامت
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          {/* دکمه تغییر تم */}
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* منو کاربر */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ ml: 1 }} className="text-red-500" />
              خروج از سیستم
            </MenuItem>
            {/* حذف آیتم تغییر تم از منو */}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
