import axios from 'axios';
import { PostTypes } from '../types/postTypes';
import { apiAuth } from './api';

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

interface ResponseMyGroup {
  created_at: Date,
  description: string,
  group_image: string,
  id: string,
  name: string,
}

export const myGroupsRequest = async (): Promise<ResponseMyGroup[]> => {
  const response = await apiAuth.get("/groups/myGroup");
  return response.data;
}

type PostType = 'Publicar em meu perfil' | 'Apenas registrar e não publicar' | 'Publicar em um grupo';
type MappedPostType = 'profile' | 'private' | 'group';

type ActivityRequestData = {
  post_type: PostType;
  duration: number;
  category_name: string;
  activity_date: Date;
  description?: string;
  files?: File[] | undefined;
  group_id?: string;
};

const mapPostType = (postType: PostType): MappedPostType => {
  const mappings: Record<PostType, MappedPostType> = {
    'Publicar em meu perfil': 'profile',
    'Apenas registrar e não publicar': 'private',
    'Publicar em um grupo': 'group',
  };
  return mappings[postType];
};


export const NewActivityRequest = async (data: ActivityRequestData): Promise<void> => {
  const payload = {
    post_type: mapPostType(data.post_type),
    duration: data.duration,
    category_name: data.category_name,
    activity_date: data.activity_date.toISOString(),
    description: data.description,
    group_id: data.group_id,
  };


  await apiAuth.post('/activities/new ', {
    ...payload
  });
}


export const refreshToken = async (refresh_token: string) => {
  const response = await req.post(`${apiUrl}/refresh`, {}, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });

  const newToken = response.data.accessToken;
  return newToken;
};