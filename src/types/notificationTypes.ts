export interface UserType {
  name: string;
  image: string;
}

export interface NotificationType {
  id: number;
  user: UserType;
  message: string;
  date: string;
}
