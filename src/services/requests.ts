import axios from 'axios';
import { PostTypes } from '../types/postTypes';

const req = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = async (): Promise<PostTypes[]> => {
  const result = await req.get('/posts');
  return result.data;
};

export const getPost = async (id: number): Promise<PostTypes> => {
  const result = await req.get(`/posts/${id}`);
  return result.data;
};
