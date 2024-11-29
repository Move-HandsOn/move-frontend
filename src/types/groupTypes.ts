export interface GroupTypes {
    id: string;
    name: string;
    description: string;
    group_image: string | null;
    group_type: 'public' | 'private';
    category_id: number;
    admin_id: string;
    created_at: string;
    members: {
      id: string;
      name: string;
      profile_image: string;
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
    groupRequests: {
      status: 'joined' | 'pending' | 'left';
      user: {
        id: string;
        name: string;
        profile_image: string;
      };
    }[];
    status: 'joined' | 'pending' | 'left';
  }
  