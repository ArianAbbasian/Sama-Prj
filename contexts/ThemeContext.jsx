// contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // اضافه کردن کلاس برای dark mode scrollbar
    if (darkMode) {
      document.body.classList.add('dark-mode-scrollbar');
    } else {
      document.body.classList.remove('dark-mode-scrollbar');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    direction: 'rtl',
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Vazirmatn", "Vazir", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 500,
      },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#1976d2',
            right: 0,
            left: 'auto !important',
            transition: 'none !important',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? '#1e1e1e' : '#2c3e50',
            color: '#ffffff',
            right: 0,
            left: 'auto !important',
            transform: 'translateX(0) !important',
          },
          paperAnchorRight: {
            transform: 'translateX(100%) !important',
          },
          paperAnchorDockedRight: {
            transform: 'translateX(0) !important',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            direction: 'rtl',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: '"Vazirmatn", "Vazir", sans-serif',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: '"Vazirmatn", "Vazir", sans-serif',
          },
        },
      },
    },
  });

  const value = {
    darkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <div dir="rtl" style={{ 
          minHeight: '100vh',
          position: 'relative'
        }}>
          {children}
        </div>
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}