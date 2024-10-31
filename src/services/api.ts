import axios from 'axios';
import { useCookies } from 'react-cookie';

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
    const [cookies] = useCookies(['token']);

    const token = cookies.token;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie, removeCookie] = useCookies(['token']);
    const [{ refresh_token }] = useCookies(["refresh_token"]);

    const originalRequest = error.config;

    if ( error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Unauthorized'
    ) {

      try {
        const response = await axios.post(`${apiUrl}/refresh`, {}, {  headers: {
          Authorization: `Bearer ${refresh_token}`,
        }, });
        const newToken = response.data.accessToken;

        setCookie('token', newToken, { 
          path: '/', 
          maxAge: 300,
          secure: true,
          sameSite: 'strict'
        });

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return apiAuth(originalRequest);
      } catch (refreshError) {
        removeCookie('token', { path: '/' });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

