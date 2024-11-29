import * as zod from 'zod';

export const TIME_FORMAT = 'HH:mm';

export const dataEventValidSchema = zod.object({
  name: zod.string().min(3, 'O nome deve ter no minimo 3 caracteres'),
  event_date: zod.date(),
  address: zod.string().min(3, 'O endere o deve ter no m nimo 3 caracteres'),
  is_recurring: zod.boolean().optional(),
  recurrence_interval: zod.number().optional(),
  start_time: zod.date(),
  end_time: zod.date(),
  description: zod.string().optional(),
  event_type: zod.enum(['private', 'profile', 'group']),
  group_id: zod.string().optional(),
});

export type IDataEventValidSchema = Zod.infer<typeof dataEventValidSchema>;


type EEventType = 'private' |'profile' |'group';

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
  event_type: EEventType;
  user_id: string;
  group_id: string | null;
  user: {
    id: string,
    name: string,
    profile_image: string
  }
}

export interface CalendarResponse {
  event: {
    id: string;
    name: string;
    event_date: string;
    address: string;
    is_recurring?: boolean;
    recurrence_interval?: number;
    start_time: string;
    end_time: string;
    description: string;
    created_at: string;
    event_type: EEventType;
    user_id: string;
    group_id?: string;
    group?: string;
    user: {
      id: string;
      name: string;
      profile_image: string;
    };
  }; 
}