import PublishOptionsList from '@/components/PublishOptionsList/PublishOptionsList';
import style from './newGroup.module.css';
import { useState } from 'react';
import ActivityList from '@/components/ActivityList/ActivityList';
import NavBar from '@/components/NavBar/NavBar';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';
import { UploadAll } from '../../components/UploadAll/UploadAll';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UploadFile } from 'antd';
import InputStd from './../../components/InputStd/InputStd';
import friendIcon from '@/assets/friends.png';
import ModalSelectFriend from '@/components/ModalSelectFriend/ModalSelectFriend';
import { useMutation } from '@tanstack/react-query';
import { NewGroupRequest } from '@/services/requests';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading/Loading';

const activitiesDone: Array<string> = [
  'Corrida',
  'Caminhada',
  'Ciclismo',
  'Trilha',
  'Futebol',
  'Basquete',
  'Vôlei',
  'Tênis',
  'Natação',
  'Musculação',
  'Crossfit',
];

type Friend = {
  idFriend: string;
  name: string;
  image: string;
};

function NewGroup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [selectedOption, setSelectedOption] = useState('');

  const [selectFriends, setSelectFriends] = useState<{ [key: string]: Friend }>(
    {}
  );
  const [modalSelectFriends, setModalSelectFriends] = useState<boolean>(false);

  const addFriend = (newFriend: Friend) => {
    setSelectFriends((prevFriends) => {
      if (!prevFriends[newFriend.idFriend]) {
        return { ...prevFriends, [newFriend.idFriend]: newFriend };
      }
      return prevFriends;
    });
  };

  const [options] = useState<Array<string>>([
    'Publicar no grupo',
    'Publicar no grupo e no perfil',
  ]);

  const handleSelectPublishChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const option = event.target.value;
    setSelectedOption(option);
  };

  const dataGroupValidSchema = zod.object({
    group_type: zod
      .enum(['Publicar no grupo', 'Publicar no grupo e no perfil'])
      .refine(
        (val) =>
          ['Publicar no grupo', 'Publicar no grupo e no perfil'].includes(val),
        {
          message:
            'Tipo de post inválido. Escolha entre "Publicar no grupo" ou "Publicar no grupo e no perfil".',
        }
      ),
    category_name: zod.enum([
      'Corrida',
      'Caminhada',
      'Ciclismo',
      'Trilha',
      'Futebol',
      'Basquete',
      'Vôlei',
      'Tênis',
      'Natação',
      'Musculação',
      'Crossfit',
    ]),
    description: zod.string().optional(),
    name: zod.string().min(3, 'O nome do grupo é obrigatório.'),
    files: zod.array(zod.instanceof(File)).optional(),
  });

  type IDataGroupValidSchema = zod.infer<typeof dataGroupValidSchema>;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IDataGroupValidSchema>({
    resolver: zodResolver(dataGroupValidSchema),
    defaultValues: {
      group_type: 'Publicar no grupo',
      description: '',
      files: [],
    },
  });

  const { mutateAsync: FormAsync } = useMutation({
    mutationFn: async (data: IDataGroupValidSchema) => {
      setLoading(true);
      const friendIds =
        Object.keys(selectFriends).length > 0
          ? Object.values(selectFriends).map((friend) => friend.idFriend)
          : [];
      await NewGroupRequest({
        ...data,
        friend_ids: friendIds,
        files: fileList,
      });
    },
    onSuccess: () => {
      setLoading(false);
      navigate('/groups');
    },
  });

  const onSubmit = (data: IDataGroupValidSchema) => {
    FormAsync(data);
  };

  return (
    <div className={style.container}>
      <NavBar title="Novo Grupo" />
      <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
        <div className={style.register}>
          <div className={style.group}>
            <h3>Detalhes da atividade</h3>
            <PublishOptionsList
              options={options}
              value={selectedOption}
              {...register('group_type')}
              onChange={handleSelectPublishChange}
            />
            <ActivityList
              options={activitiesDone}
              {...register('category_name')}
            />
            <InputStd
              style={{ width: '100%' }}
              placeholder="Qual o nome do grupo?"
              {...register('name')}
            />
          </div>

          <div className={style.group}>
            <h3>Nos conte um pouco mais</h3>
            <TextArea
              id="activity-details"
              placeholder="Detalhes da minha atividade (opcional)"
              {...register('description')}
            ></TextArea>
            <UploadAll fileList={fileList} setFileList={setFileList} />
            <Button
              variant="gray"
              onClick={() => {
                setModalSelectFriends(true);
              }}
            >
              <img
                src={friendIcon}
                className={style.friendIcon}
                alt="adicionar amigo"
              />
              Adicionar amigos
            </Button>
            {Object.values(selectFriends).map(
              ({ idFriend, image, name }: Friend) => (
                <div className={style.friend} key={idFriend}>
                  <img src={image} alt="" />
                  <h1>{name}</h1>
                </div>
              )
            )}
          </div>
        </div>
        <Button
          variant="gray"
          disabled={!isValid}
          name="Publicar"
          type="submit"
        />
      </form>
      {modalSelectFriends && (
        <ModalSelectFriend
          closeModal={() => {
            setModalSelectFriends(false);
          }}
          handleGroup={addFriend}
        ></ModalSelectFriend>
      )}
      <Loading show={loading} />
    </div>
  );
}

export default NewGroup;
