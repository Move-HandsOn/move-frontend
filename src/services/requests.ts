import axios from 'axios';
import { PostTypes } from '../types/postTypes';
import { apiAuth } from './api';
import { UploadFile } from 'antd';
import { formatedDate } from '@/utils/formatedDate';
import { ProfileTypes } from '../types/profileTypes';

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

export const Login = async ({
  email,
  password,
}: RequestLogin): Promise<ResponseLogin> => {
  const response = await req.post('/login', { email, password });

  return {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  };
};

interface ResponseMyGroup {
  created_at?: Date;
  description?: string;
  group_image?: string;
  id: string;
  name: string;
}

interface ResponseUser {
  id: string;
  email?: string;
  profile_image?: string;
  bio?: string;
  name?: string;
  gender?: string | null;
}


export const myGroupsRequest = async (): Promise<ResponseMyGroup[]> => {
  const response = await apiAuth.get('/groups/myGroup');
  return response.data;
};

export const allGroupsRequest = async (): Promise<ResponseMyGroup[]> => {
  const response = await apiAuth.get("/groups");
  return response.data;
};

interface searchProps {
  value?: string;
  filter?: 'users' | 'groups';
}

interface ResponseUserGroup {
  users: ResponseUser[];
  groups: ResponseMyGroup[];
  posts: unknown[];
}

export const searchUsersAndGroups = async ({value, filter}: searchProps): Promise<ResponseUserGroup> =>{
  if(value && filter){
    const response = await apiAuth.get(`/search?text=${value}&filters=${filter}`)
    return response.data
  }
  const response = await apiAuth.get(`/search`)
  return response.data
}

type PostType =
  | 'Publicar em meu perfil'
  | 'Apenas registrar e não publicar'
  | 'Publicar em um grupo';
type MappedPostType = 'profile' | 'private' | 'group';

type ActivityRequestData = {
  post_type: PostType;
  duration: number;
  category_name: string;
  activity_date: Date;
  description?: string;
  files?: UploadFile[] | undefined;
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

export const NewActivityRequest = async (
  data: ActivityRequestData
): Promise<void> => {
  const date = formatedDate(data.activity_date);
  const formData = new FormData();

  formData.append('post_type', mapPostType(data.post_type));
  formData.append('duration', data.duration.toString());
  formData.append('category_name', data.category_name);
  formData.append('activity_date', date);
  formData.append('description', data.description ?? '');
  formData.append('group_id', data.group_id ?? '');

  if (data.files && data.files.length) {
    data.files.forEach((file) => {
      const originFile = file.originFileObj;

      if (originFile) {
        formData.append('files', originFile);
      }
    });
  }

  const config = {
    headers: {
      ...apiAuth.defaults.headers.common,
      'Content-Type': 'multipart/form-data',
    },
  }

  await apiAuth.post('/activities/new', formData, config);
};

export const refreshToken = async (refresh_token: string) => {
  const response = await req.get(`${apiUrl}/refresh`, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });

  const newToken = response.data.accessToken;
  return newToken;
};

export const getProfile = async (): Promise<ProfileTypes> => {
  const response = await apiAuth.get('/profile');

  return response.data;
};
