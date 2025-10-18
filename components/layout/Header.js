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
  useMediaQuery,
  Badge,
} from "@mui/material";
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  ExitToApp,
  MenuOpen,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useTheme } from "../../contexts/ThemeContext";

export default function Header({ onDrawerToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    alert("عملکرد خروج کاربر (در حالت طراحی فعال نیست)");
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        right: 0,
      }}
    >
      <Toolbar>
        {/* دکمه همبرگری */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerToggle}
          edge="start"
          sx={{ mr: 2 }}
        >
          {isMobile ? (
            <Badge color="secondary" variant="dot">
              <MenuIcon />
            </Badge>
          ) : (
            <MenuOpen />
          )}
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "right" }}
          className="pr-3"
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
              <ExitToApp sx={{ ml: 1 }} />
              خروج کاربر
            </MenuItem>
            <MenuItem onClick={toggleDarkMode}>
              {darkMode ? (
                <Brightness7 sx={{ ml: 1 }} />
              ) : (
                <Brightness4 sx={{ ml: 1 }} />
              )}
              {darkMode ? "حالت روشن" : "حالت تاریک"}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
