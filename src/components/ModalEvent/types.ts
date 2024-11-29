type EEventType = 'private' |'profile' |'group';

export interface CalendarResponse {
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