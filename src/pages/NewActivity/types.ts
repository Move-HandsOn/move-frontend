import * as zod from 'zod';

export const dataPostValidSchema = zod.object({
  post_type: zod.enum([
    'Publicar em meu perfil',
    'Apenas registrar e não publicar',
    'Publicar em um grupo',
  ]),
  duration: zod.number(),
  category_name: zod.string(),
  activity_date: zod.date(),
  description: zod.string().optional(),
  files: zod.array(zod.instanceof(File)).optional(),
});

export type IDataPostValidSchema = zod.infer<typeof dataPostValidSchema>;
