// components/RouteGuard.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../services/api';
import { loginSuccess } from '../store/authSlice';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      
      // اگر توکن وجود داره، state رو آپدیت کن
      if (token) {
        dispatch(loginSuccess(token));
      }

      // اگر در صفحه اصلی هستیم و توکن داریم، به دشبورد برویم
      if (router.pathname === '/' && token) {
        router.push('/dashboard');
      } 
      // اگر در دشبورد هستیم و توکن نداریم، به صفحه اصلی برویم
      else if (router.pathname.startsWith('/dashboard') && !token) {
        router.push('/');
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [router, dispatch, isAuthenticated]);

  // هنگام چک کردن auth، loading نشان بده
  if (isChecking) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div>در حال بررسی دسترسی...</div>
      </div>
    );
  }

  return children;
}