export interface PostTypes {
  id: string;
  author: {
    name: string;
    image: string;
  };
  content: string;
  postDate: Date;
  commentsCount: number;
  likes: number;
  likedByCurrentUser: boolean;
  activityImage?: string;
  isUserView: boolean;
}
