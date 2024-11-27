export const categoryMap: Record<number, string> = {
  1: 'Corrida',
  2: 'Caminhada',
  3: 'Ciclismo',
  4: 'Trilha',
  5: 'Futebol',
  6: 'Basquete',
  7: 'Vôlei',
  8: 'Tênis',
  9: 'Natação',
  10: 'Musculação',
  11: 'Crossfit',
};

export interface Comments {
  id: string;
  activity_id: string;
  post_id: string | null;
  comment_text: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: {
    name: string;
    profile_image: string;
  };
  likes: string[];
}
