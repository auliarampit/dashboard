import axios, { AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { refreshToken } from '../redux/slices/authSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

// Hook useAxios untuk mengonfigurasi instance axios dengan interceptors
const useAxios = (): AxiosInstance => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Menambahkan interceptor untuk menangani refresh token
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newToken = await dispatch(refreshToken()).unwrap();
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure, e.g., logout user
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Mengembalikan fungsi pembersih untuk interceptor
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [token, dispatch]);

  return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default useAxios;
