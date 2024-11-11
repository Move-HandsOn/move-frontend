import PublishOptionsList from '@/components/PublishOptionsList/PublishOptionsList';
import style from './newGroup.module.css';
import { useState } from 'react';
import ActivityList from '@/components/ActivityList/ActivityList';
import NavBar from '@/components/NavBar/NavBar';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';
import { UploadAll } from '../../components/UploadAll/UploadAll';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { UploadFile } from 'antd';
import InputStd from './../../components/InputStd/InputStd';
import friendIcon from "@/assets/friends.png";

const activitiesDone: Array<string> = [
  "Conteúdo em texto",
  "Corrida",
  "Caminhada",
  "Ciclismo",
  "Trilha",
  "Futebol",
  "Basquete",
  "Vôlei",
  "Tênis",
  "Natação",
  "Musculação",
  "Crossfit"
];

function NewGroup() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
  const [selectedOption, setSelectedOption] = useState('');

  const [options] = useState<Array<string>>([
    'Publicar no grupo',
    'Publicar no grupo e no perfil',
  ])


  const handleSelectPublishChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
  }

  const dataPostValidSchema = zod.object({
    post_type: zod.enum([
        'Publicar no grupo',
        'Publicar no grupo e no perfil',
    ]),
    category_name: zod.string(),
    description: zod.string().optional(),
    name: zod.string(),
    files: zod.array(zod.instanceof(File)).optional(),
  });
  
  type IDataPostValidSchema = zod.infer<typeof dataPostValidSchema>;
  
  const { register, handleSubmit } = useForm<IDataPostValidSchema>({
    resolver: zodResolver(dataPostValidSchema),
    defaultValues: {
      post_type: "Publicar no grupo",
      category_name: "",
      description: "",
      name: "",
      files: []
    }
  });

  const onSubmit = (data: IDataPostValidSchema) => {
   console.log(data);
  }

  return (
    <div className={style.container}>
      <NavBar title="Novo Grupo" />
      <form  onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
        <div className={style.register}>
          <div className={style.group}>
            <h3>Detalhes da atividade</h3>
            <PublishOptionsList
              options={options}
              value={selectedOption}
              {...register("post_type")}
              onChange={handleSelectPublishChange}
            />
            <ActivityList
              options={activitiesDone}
              {...register("category_name")}
            />
           <InputStd style={{ width: "100%"}} placeholder='Qual o nome do grupo?' {...register("name")} />
          </div>

          <div className={style.group}>
            <h3>Nos conte um pouco mais</h3>
            <TextArea 
              id="activity-details" 
              placeholder="Detalhes da minha atividade (Opcional)"
              {...register("description")}
              ></TextArea>
            <UploadAll fileList={fileList} setFileList={setFileList} />
            <Button variant='gray'> 
              <img src={friendIcon} alt="adicionar amigo" />
              Adicionar Amigos
            </Button>
          </div>
        </div>
        <Button variant="gray" disabled={true} name="Publicar" type='submit'/>
      </form>
    </div>
  );
}

export default NewGroup;
