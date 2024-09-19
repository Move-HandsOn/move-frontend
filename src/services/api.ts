import axios from 'axios';
import useAuth from '../hooks/useAuth';

export const api = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.request.use(
  (config) => {
    // chama o hook somente quando inicia a requisição, elimina o problema de usar hooks fora de componentes
    const { handleGetToken } = useAuth();
    const token = handleGetToken();
    //se houver token, vai passa-lo no header da requisição
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
