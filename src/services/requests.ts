import { formatedDate } from '@/utils/formatedDate';
import { UploadFile } from 'antd';
import axios from 'axios';
import { NotificationType } from '../types/notificationTypes';
import { ProfileTypes } from '../types/profileTypes';
import { apiAuth } from './api';
import dayjs from 'dayjs';

const apiUrl = import.meta.env.VITE_API_URL;

const req = axios.create({
  baseURL: apiUrl,
});

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
  members: unknown[];
  group_type: string;
  status: string;
  events: unknown[];
  onJoin: () => void;
}

export type GroupDetailResponse = {
  id: number;
  name: string;
  description: string;
  group_image: string;
  group_type: string;
  created_at: Date;
  admin: {
    id: string;
    name: string;
    profile_image: string;
  };
  category: {
    category_name: string;
  };
  members: {
    id: string;
    name: string;
    profile_image: string;
  }[];
  groupRequests: {
    status: string;
    user: {
      id: string;
      name: string;
      profile_image: string;
    };
  }[];
  activities: {
    id: number;
    name: string;
    description: string;
    user: {
      id: string;
      name: string;
      profile_image: string;
    };
  }[];
  events: {
    id: number;
    name: string;
    description: string;
    user: {
      id: string;
      name: string;
      profile_image: string;
    };
  }[];
};

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
  const response = await apiAuth.get('/groups');
  return response.data;
};

export const getGroupDetail = async (
  id: string
): Promise<GroupDetailResponse> => {
  const response = await apiAuth.get(`/groups/${id}`);
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

export const searchUsersAndGroups = async ({
  value,
  filter,
}: searchProps): Promise<ResponseUserGroup> => {
  if (value && filter) {
    const response = await apiAuth.get(
      `/search?text=${value}&filters=${filter}`
    );
    return response.data;
  }
  const response = await apiAuth.get(`/search`);
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

export const postNewComment = async (id: string, comment: string) => {
  const response = await apiAuth.post('/comment', {
    activity_id: id,
    comment_text: comment,
  });
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

export const requestJoinGroup = async (groupId: string) => {
  return await apiAuth.post(`/groups/${groupId}/requests`);
};

export interface ActivityComments {
  id: string;
  activity_id: string;
  post_id: string | null;
  comment_text: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
  likes: string[];
}

export interface ActivityLikes {
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
}

export interface ActivityType {
  id: string;
  duration: number;
  activity_date: string;
  description: string;
  post_type: 'profile' | 'group';
  category_id: number;
  user_id: string;
  currentUserliked: boolean;
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
  group_id: string | null;
  updated_at: string;
  created_at: string;
  media: {
    media_url: string;
  }[];
  comments: ActivityComments[];
  likes: ActivityLikes[];
}

export interface Feed {
  post: [];
  activities: ActivityType[];
}

export const feedRequest = async (): Promise<Feed> => {
  const responseFeed = await apiAuth.get('/feed');
  return responseFeed.data;
};

interface ChangeLikeActivityRequest {
  activity_id: string;
}
export const changeLikeActivity = async ({
  activity_id,
}: ChangeLikeActivityRequest): Promise<void> => {
  await apiAuth.post('/like', { activity_id });
};

export const followUser = async (followed_id: string) => {
  return await apiAuth.post(`/follow/${followed_id}`);
};

export interface EventResponse {
  event: {
    id: string;
    name: string;
    event_date: string;
    address: string;
    is_recurring?: boolean;
    recurrence_interval?: null;
    start_time: string;
    end_time: string;
    description: string;
    created_at: string;
    event_type: EEventType;
    user_id: string;
    group_id?: null;
    group?: null;
    user: {
      id: string;
      name: string;
      profile_image: string;
    };
  } 
}

interface EventByIdResponse {
  id: string;
  name: string;
  event_date: string;
  address: string;
  is_recurring: boolean;
  recurrence_interval: number | null;
  start_time: string;
  end_time: string;
  description: string;
  created_at: string;
  event_type: EEventType;
  user_id: string;
  group_id: string | null;
}


export const calendar = async (date: string): Promise<EventResponse[]> => {
  const dateStart = dayjs(date);
  const dateEnd = dateStart
    .add(23, 'hour')
    .add(59, 'minute')
    .add(59, 'second').
    toISOString();
  const response = await apiAuth.get<EventResponse[]>(`/calendar?start_date=${dateStart.toISOString()}&end_date=${dateEnd}`);
  return response.data;
}

export const findEventById = async (id: string): Promise<EventByIdResponse> => {
  const response = await apiAuth.get(`/events/${id}`);
  return response.data;
}

type EEventType = 'private' |'profile' |'group';

interface EventRequestData { 
  name: string
  event_date: string
  address: string
  is_recurring?: boolean
  start_time: string
  end_time: string
  description?: string
  event_type: EEventType
  group_id?: string
  recurrence_interval?: number
}

interface NewEventResponse {
  id: string;
  name: string;
  event_date: string;
  address: string;
  is_recurring: boolean;
  recurrence_interval: number | null;
  start_time: string;
  end_time: string;
  description: string | null;
  created_at: string;
  event_type: EEventType;
  user_id: string;
  group_id: string | null;
  user: {
    id: string,
    name: string,
    profile_image: string
  }
}


export const newEventRequest = async (
  data: EventRequestData
): Promise<NewEventResponse> => {
  const dataJson: EventRequestData = {
    name: data.name,
    event_date: data.event_date,
    address: data.address,
    start_time: data.start_time,
    end_time: data.end_time,
    event_type: data.event_type,
    is_recurring: false,    
  };

  if (data.is_recurring) {
    dataJson.is_recurring = data.is_recurring;
    dataJson.recurrence_interval = 7;
  }

  if (data.description) {
    dataJson.description = data.description;
  }

  if (data.group_id) {
    dataJson.group_id = data.group_id;
  }

  const response = await apiAuth.post('/events', dataJson);
  return response.data
};

export const deleteEvent = async (id: string) => {
  await apiAuth.delete(`/events/${id}`);
}
