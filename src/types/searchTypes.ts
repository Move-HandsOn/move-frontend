export interface SearchTypes {
  type: 'group' | 'activity' | 'user' | 'post';
  id: number;
  name: string;
  image: string | null;
}
