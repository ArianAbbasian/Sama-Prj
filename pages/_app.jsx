// pages/_app.jsx
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '../contexts/ThemeContext';
import RouteGuard from '../components/RouteGuard';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.dir = 'rtl';
    document.body.style.direction = 'rtl';
    document.body.style.textAlign = 'right';
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;