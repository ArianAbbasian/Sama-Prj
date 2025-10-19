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
      
     
      if (token) {
        dispatch(loginSuccess(token));
      }

     
      if (router.pathname === '/' && token) {
        router.push('/dashboard');
      } 
   
      else if (router.pathname.startsWith('/dashboard') && !token) {
        router.push('/');
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [router, dispatch, isAuthenticated]);

  
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