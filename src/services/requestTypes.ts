import { UploadFile } from 'antd';

export interface RequestLogin {
  email: string;
  password: string;
}

export interface ResponseLogin {
  accessToken: string;
  refreshToken: string;
}

export interface ResponseMyGroup {
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

export interface IEvent {
  id: string;
  name: string;
  event_date: string;
  address: string;
  is_recurring: boolean;
  recurrence_interval: string | null;
  start_time: string;
  end_time: string;
  description: string;
  created_at: string;
  event_type: string;
  user_id: string;
  group_id: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
}

export interface IGroupRequests {
  id: string;
  group_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
}

export interface IMembers {
  group_id: string;
  user_id: string;
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
}

export type GroupDetailResponse = {
  id: string;
  name: string;
  description: string;
  group_image: string | null;
  group_type: 'private' | 'public';
  category_id: number;
  admin_id: string;
  created_at: string;
  events: IEvent[];
  activities: ActivityType[];
  groupRequests: IGroupRequests[];
  members: IMembers[];
  category: {
    category_name: string;
  };
  admin: {
    id: string;
    name: string;
    profile_image: string;
  };
};

export interface ResponseUser {
  id: string;
  email?: string;
  profile_image?: string;
  bio?: string;
  name?: string;
  gender?: string | null;
}

export interface RequestLogin {
  email: string;
  password: string;
}

export interface ResponseLogin {
  accessToken: string;
  refreshToken: string;
}

export interface SearchProps {
  value?: string;
  filter?: 'users' | 'groups';
}

export interface ResponseUserGroup {
  users: ResponseUser[];
  groups: ResponseMyGroup[];
  posts: unknown[];
}

export type PostType =
  | 'Publicar em meu perfil'
  | 'Apenas registrar e não publicar'
  | 'Publicar em um grupo';

export type MappedPostType = 'profile' | 'private' | 'group';

export type ActivityRequestData = {
  post_type: PostType;
  duration: number;
  category_name: string;
  activity_date: Date;
  description?: string;
  files?: UploadFile[] | undefined;
  group_id?: string;
};

export type GroupType = 'Publicar no grupo' | 'Publicar no grupo e no perfil';
export type MappedGroupType = 'private' | 'public';

export type GroupRequestData = {
  name: string;
  category_name: string;
  description?: string;
  group_type: GroupType;
  friend_ids?: string[];
};

export interface Friend {
  id: string;
  name: string;
  profile_image: string;
}

export interface ResponseFriends {
  friends: Friend[];
}

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
    event_type: EventTypeType;
    user_id: string;
    group_id?: null;
    group?: null;
    user: {
      id: string;
      name: string;
      profile_image: string;
    };
  };
}

export interface EventByIdResponse {
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
  event_type: EventTypeType;
  user_id: string;
  group_id: string | null;
}

export type EventTypeType = 'private' | 'profile' | 'group';

export interface EventRequestData {
  name: string;
  event_date: string;
  address: string;
  is_recurring?: boolean;
  start_time: string;
  end_time: string;
  description?: string;
  event_type: EventTypeType;
  group_id?: string;
  recurrence_interval?: number;
}

export interface ChangeLikeActivityRequest {
  activity_id: string;
}

export interface NewEventResponse {
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
  event_type: EventTypeType;
  user_id: string;
  group_id: string | null;
  user: {
    id: string;
    name: string;
    profile_image: string;
  };
}


export interface SearchRequest {
  value: string;
  isGroups: boolean;
  isUsers: boolean;
}

export interface SearchAxiosResponse {
  users: {
    id: string,
    name: string,
    profile_image: string
  }[],
  groups: {
    id: string,
    name: string,
    group_image: string
  }[]
}

export interface SearchResponse {
  type: 'users' | 'groups',
  name: string;
  image: string;
  id: string
}