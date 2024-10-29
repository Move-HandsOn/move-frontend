export interface ProfileTypes {
  name: string;
  image: string;
  followers: number;
  following: number;
  groups: number;
  notification: number;
  dailyAverage: number | string;
  activityRecords: {
    day: string;
    hours: number;
  }[];
}
