// services/authService.js
import axios from 'axios';
import { setToken, getToken, removeToken } from './api';

export const authService = {
  // دریافت توکن از API
  login: async () => {
    try {
      console.log('Calling API...');
      const response = await axios.get('https://api.samateb.ir/API/Interview/Auth', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log('Full API Response:', response);
      console.log('Response data:', response.data);
      
      // بررسی ساختار response
      if (response.data && response.data.isSuccessed) {
        // توکن از result.credential باید گرفته بشه
        const token = response.data.result?.credential;
        
        if (token) {
          console.log('Token received:', token);
          setToken(token);
          return { success: true, token };
        } else {
          console.log('No token found in response');
          return { success: false, error: 'توکن در پاسخ API یافت نشد' };
        }
      } else {
        return { 
          success: false, 
          error: response.data?.message || 'پاسخ نامعتبر از سرور' 
        };
      }
    } catch (error) {
      console.error('Auth API Error:', error);
      
      let errorMessage = 'خطا در ارتباط با سرور';
      
      if (error.response) {
        errorMessage = `خطای سرور: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'پاسخی از سرور دریافت نشد';
      } else {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  },

  // بررسی وجود توکن معتبر
  isAuthenticated: () => {
    return !!getToken();
  },

  // خروج کاربر
  logout: () => {
    removeToken();
  }
};