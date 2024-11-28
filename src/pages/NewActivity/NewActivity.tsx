import PublishOptionsList from '@/components/PublishOptionsList/PublishOptionsList';
import style from './newActivity.module.css';
import { useState } from 'react';
import ActivityList from '@/components/ActivityList/ActivityList';
import NavBar from '@/components/NavBar/NavBar';
import HourInput from '@/components/HourInput/HourInput';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';
import ModalSelectGroup from '@/components/ModalSelectGroup/ModalSelectGroup';
import { DatePicker, UploadFile } from 'antd';
import { SelectDuration } from '@/components/SelectDuration/SelectDuration';
import { UploadAll } from '../../components/UploadAll/UploadAll';
import { myGroupsRequest, NewActivityRequest } from '@/services/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

function NewActivity() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['myGroups'],
    queryFn: async () => {
      const response = await myGroupsRequest();
      return response;
    },
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [duration, setDuration] = useState<{
    value: number;
    label: string;
  }>({
    value: 0,
    label: '',
  });

  const [options, setOptions] = useState<Array<string>>([
    'Publicar em meu perfil',
    'Apenas registrar e não publicar',
    'Publicar em um grupo',
  ]);

  const [modalSelectGroupActivited, setModalSelectGroupActivited] =
    useState<boolean>(false);
  const [modalSelectDuration, setModalSelectDuration] =
    useState<boolean>(false);
  const [groupSelected, setGroupSelected] = useState<
    { name: string; idGroup: string } | undefined
  >(undefined);

  const handleSelectPublishChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const option = event.target.value;
    setSelectedOption(option);

    if (option === 'Publicar em um grupo') {
      setModalSelectGroupActivited(true);
    } else if (option !== 'Publicar em um grupo') {
      setModalSelectGroupActivited(false);
      if (groupSelected) {
        setOptions((prevOptions) =>
          prevOptions.filter((option) => option !== groupSelected!.name)
        );
      }
      setGroupSelected(undefined);
    }
  };

  const handleGroup = (value: { idGroup: string; name: string }) => {
    setSelectedOption(value.name);
    setModalSelectGroupActivited(false);
    setOptions((prevOptions) => [...prevOptions, value.name]);
    setGroupSelected({ name: value.name, idGroup: value.idGroup });
  };

  const handleDuration = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => {
    setDuration({ value, label });
    setModalSelectDuration(false);
    setValue('duration', value, { shouldValidate: true });
  };

  const dataPostValidSchema = zod.object({
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

  type IDataPostValidSchema = zod.infer<typeof dataPostValidSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<IDataPostValidSchema>({
    resolver: zodResolver(dataPostValidSchema),
    defaultValues: {
      post_type: 'Publicar em meu perfil',
    },
    mode: 'onChange',
  });

  const { mutateAsync: FormAsync } = useMutation({
    mutationFn: async (data: IDataPostValidSchema) => {
      setLoading(true);
      await NewActivityRequest({
        ...data,
        group_id:
          data.post_type === 'Publicar em um grupo'
            ? groupSelected?.idGroup
            : undefined,
        files: fileList,
      });
    },
    onSuccess: () => {
      setLoading(false);
      navigate('/feed');
    },
  });

  const onSubmit = (data: IDataPostValidSchema) => {
    FormAsync(data);
  };

  return (
    <div className={style.container}>
      <NavBar title="Novo Registro" />
      <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
        <div className={style.register}>
          <div className={style.group}>
            <h3>Detalhes da atividade</h3>
            <PublishOptionsList
              options={options}
              value={selectedOption}
              {...register('post_type')}
              onChange={handleSelectPublishChange}
            />
            <ActivityList
              options={activitiesDone}
              {...register('category_name')}
            />
            <div className={style.inputs_date_time}>
              <DatePicker
                placeholder="Quando?"
                className={style.datepicker}
                onChange={(date) =>
                  setValue('activity_date', date.toDate(), {
                    shouldValidate: true,
                  })
                }
              />
              <HourInput
                dates={[duration]}
                onClick={() => {
                  setModalSelectDuration(true);
                }}
                value={duration.value}
                {...register('duration')}
              />
            </div>
          </div>

          <div className={style.group}>
            <h3>Nos conte um pouco mais</h3>
            <TextArea
              id="activity-details"
              placeholder="Detalhes da minha atividade (Opcional)"
              {...register('description')}
            ></TextArea>
            <UploadAll fileList={fileList} setFileList={setFileList} />
          </div>
        </div>
        <Button
          variant="gray"
          disabled={!isValid}
          name="Publicar"
          type="submit"
        />
      </form>
      {modalSelectGroupActivited && (
        <ModalSelectGroup
          options={
            data?.map(({ id, name, group_image }) => ({
              id,
              name,
              image: group_image,
            })) || []
          }
          closeModal={() => {
            setModalSelectGroupActivited(false);
          }}
          handleGroup={handleGroup}
        />
      )}
      {modalSelectDuration && (
        <SelectDuration
          close={() => {
            setModalSelectDuration(false);
          }}
          handleDuration={handleDuration}
        ></SelectDuration>
      )}
      <Loading show={loading} />
    </div>
  );
}

export default NewActivity;
