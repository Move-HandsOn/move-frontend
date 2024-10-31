import axios from 'axios';
import { PostTypes } from '../types/postTypes';

const apiUrl = import.meta.env.VITE_API_URL;

const req = axios.create({
  baseURL: apiUrl,
});

export const getPosts = async (): Promise<PostTypes[]> => {
  const result = await req.get('/posts');
  return result.data;
};

export const getPost = async (id: number): Promise<PostTypes> => {
  const result = await req.get(`/posts/${id}`);
  return result.data;
};


interface RequestLogin {
  email: string;
  password: string;
}

interface ResponseLogin {
  accessToken: string;
  refreshToken: string;
}


export const Login = async ({ email, password }: RequestLogin): Promise<ResponseLogin> => {
  const response = await req.post("/login", {email, password});

  return {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  }
}
