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
