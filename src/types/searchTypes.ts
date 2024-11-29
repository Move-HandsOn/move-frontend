export interface SearchTypes {
  type: 'group' | 'activity' | 'user' | 'post';
  id: number;
  name: string[];
  image: {
    img: string;
    title: string;
  }[];
}
