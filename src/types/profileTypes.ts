export interface ProfileTypes {
  id: string;
  name: string;
  email: string;
  profile_image: string;
  bio: string;
  gender: null | string;
  activities: {
    id: string;
    duration: number;
    activity_date: string;
    description: string;
    post_type: string;
    category_id: number;
    user_id: string;
    group_id: null;
    updated_at: string;
    created_at: string;
    media: [];
    comments: [];
    likes: [];
  }[];

  interests: string[];
  posts: string[];
  groups: string[];
  followers: string[];
  following: string[];
  events: string[];
  followerCount: number;
  followingCount: number;
  groupCount: number;
  activityCount: number;
  notification: undefined;
  averageDaily: number;
  activityRecords: {
    day: string;
    hours: number;
  }[];
  weekdayDuration: [{ day: string; hours: number }];
}
