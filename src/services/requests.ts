import axios from 'axios';
import { PostTypes } from '../types/postTypes';
import { apiAuth } from './api';
import { UploadFile } from 'antd';
import { formatedDate } from '@/utils/formatedDate';
import { ProfileTypes } from '../types/profileTypes';
import { NotificationType } from '../types/notificationTypes';

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
  created_at: Date;
  description: string;
  group_image: string;
  id: string;
  name: string;
}

export const myGroupsRequest = async (): Promise<ResponseMyGroup[]> => {
  const response = await apiAuth.get('/groups/myGroup');
  return response.data;
};

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
  };

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

export const deleteActivity = async (id: string): Promise<void> => {
  const response = await apiAuth.delete(`/activities/${id}`);
  return response.data;
};

type GroupType = 'Publicar no grupo' | 'Publicar no grupo e no perfil';
type MappedGroupType = 'private' | 'public';

type GroupRequestData = {
  name: string;
  category_name: string;
  description?: string;
  group_type: GroupType;
  friend_ids?: string[];
};

const mapGroupType = (groupType: GroupType): MappedGroupType => {
  const mappings: Record<GroupType, MappedGroupType> = {
    'Publicar no grupo': 'private',
    'Publicar no grupo e no perfil': 'public',
  };
  return mappings[groupType];
};

export const NewGroupRequest = async (
  data: GroupRequestData
): Promise<void> => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('category_name', data.category_name);
  formData.append('description', data.description ?? '');
  formData.append('group_type', mapGroupType(data.group_type));

  if (Number(data.friend_ids?.length) > 0) {
    data.friend_ids?.map((friend: string) =>
      formData.append('friend_ids', friend)
    );
  }

  const config = {
    headers: {
      ...apiAuth.defaults.headers.common,
      'Content-Type': 'multipart/form-data',
    },
  };

  await apiAuth.post('/groups', formData, config);
};

interface Friend {
  id: string;
  name: string;
  profile_image: string;
}

interface ResponseFriends {
  friends: Friend[];
}

export const myFriendsRequest = async (): Promise<Friend[]> => {
  const response = await apiAuth.get<ResponseFriends>('/friends');
  return response.data.friends;
};

export const getNotifications = async (): Promise<NotificationType[]> => {
  const response = await apiAuth.get('/notifications');

  return response.data;
};
