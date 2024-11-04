import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_URL;

export const apiAuth = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
});

apiAuth.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
     
    const refresh_token = Cookies.get('refresh_token')

    const originalRequest = error.config;

    if ( error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Unauthorized'
    ) {

      try {
        const response = await axios.get(`${apiUrl}/refresh`, { headers: {
          Authorization: `Bearer ${refresh_token}`,
        }, });
        const newToken = response.data.accessToken;

        Cookies.set('token', newToken, { 
          path: '/', 
          maxAge: 300,
          secure: true,
          sameSite: 'strict'
        });

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return apiAuth(originalRequest);
      } catch (refreshError) {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('refresh_token', { path: '/' });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

