import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500',
  timeout: 10_000,
});

apiClient.interceptors.request.use(async (config) => {
  let token: string | undefined;

  if (typeof window !== 'undefined') {
    token = Cookies.get('authToken');
  } else {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      token = cookieStore.get('authToken')?.value;
    } catch (error) {
      console.warn('Failed to retrieve token from server cookies', error);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success !== undefined && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        Cookies.remove('authToken');
      }
    }
    const message = error.response?.data?.message ?? 'Beklenmeyen bir hata oluştu.';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
