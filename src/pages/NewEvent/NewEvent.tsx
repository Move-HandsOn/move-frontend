import style from './NewEvent.module.css';
import NavBar from '@/components/NavBar/NavBar';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';
import InputStd from '@/components/InputStd/InputStd';
import { DatePicker, TimePicker } from 'antd';
import { useState } from 'react';
import SelectGroup from '@/components/SelectGroup/SelectGroup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { myGroupsRequest, newEventRequest } from '@/services/requests';
import ModalSelectGroup from '@/components/ModalSelectGroup/ModalSelectGroup';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';

function NewEvent() {
  const navigate =  useNavigate();
  const { data } = useQuery({
    queryKey: ['myGroups'],
    queryFn: async () => {
      const response = await myGroupsRequest();
      return response;
    }
  })

  const format = 'HH:mm';

  const [isGroupPublish, setIsGroupPublish] = useState(false);
  const [modalSelectGroups, setModalSelectGroups] = useState(false);
  const [selectGroup, setSelectGroup] = useState<{ name: string, idGroup: string } | undefined>();

  const handleGroupPublish = () => {
    setIsGroupPublish(!isGroupPublish);
  };

  const handleGroup = (group: { name: string, idGroup: string }) => {
    setSelectGroup(group);
    setValue("group_id", group.idGroup);
    setValue("event_type", "group");
    setModalSelectGroups(false);
  }

  const dataEventValidSchema = zod.object({
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

  type IDataEventValidSchema = zod.infer<typeof dataEventValidSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
    watch
  } = useForm<IDataEventValidSchema>({
    resolver: zodResolver(dataEventValidSchema),
    defaultValues: {
      event_type: "private",
    }
  });

  const { mutateAsync: createAsync } = useMutation({
    mutationFn: async (data: IDataEventValidSchema) => {
      newEventRequest({
        name: data.name,
        event_date: data.event_date.toISOString(),
        address: data.address,
        start_time: data.start_time.toISOString(),
        end_time: data.end_time.toISOString(),
        event_type: data.event_type,
        is_recurring: data.is_recurring,
        recurrence_interval: data.recurrence_interval,
        description: data.description,
        group_id: data.group_id
      });  
    },
    onSuccess: () => {
      const createdEventDate = dayjs(watch("event_date")).format("YYYY-MM-DD");
      navigate(`/schedule?day=${createdEventDate}&selectIntervalDays=${createdEventDate}`);
    }
  })

  const onSubmit = (data: IDataEventValidSchema) => {
    createAsync(data);
  }

  return (
    <div className={style.container}>
      <NavBar title="Novo Evento" />
      <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.register}>
          <div className={style.group}>
            <h3>Detalhes do evento</h3>
            <InputStd style={{ width: "100%"}} placeholder='Título do evento' {...register('name')} />
            <TextArea 
              id="activity-details" 
              placeholder="Descrição (Opcional)"
              {...register('description')}
            ></TextArea>
            <InputStd style={{ width: "100%"}} placeholder='Local (Escreva a Localização)' {...register('address')}/>
            <DatePicker
                placeholder='Quando?'
                className={style.datepicker}
                onChange={(date) => setValue("event_date", date.toDate(), { shouldValidate: true })}
            />
            <div className={style.inputs_durations}>
              <TimePicker
                  placeholder='Inicio'
                  className={style.datepicker}
                  format={format}
                  onChange={(date) => setValue("start_time", date.toDate(), { shouldValidate: true })}
              />
              <TimePicker
                  placeholder='Fim'
                  className={style.datepicker}
                  format={format}
                  onChange={(date) => setValue("end_time", date.toDate(), { shouldValidate: true })}
              />
            </div>
            <h3>Compartilhamento(Opcional)</h3>
            <div className={style.flex_row_gap_12}>
                <input type="checkbox" name="profile" onChange={({target}) => target.checked ? setValue("event_type", "profile") : setValue("event_type", "private")} />
                <p>Compartilhar evento no meu perfil</p>
            </div>
            <div className={style.flex_row_gap_12}>
                <input type="checkbox" name="group" onChange={handleGroupPublish} />
                <p>Adicionar evento em um grupo</p>
            </div>
            {isGroupPublish && (
              <SelectGroup
                options={data?.map((group) => group.name) || []}
                value={selectGroup?.name ?? ''}
                onClick={() => setModalSelectGroups(true)}
              />
            )} 
            {modalSelectGroups && <ModalSelectGroup 
              options={data?.map(({id, name, group_image}) => ({ id, name, image: group_image ?? ''})) ?? []}
              closeModal={()=>{ setModalSelectGroups(false)}}
              handleGroup={handleGroup}
            />} 
          </div>
        </div>
        <Button variant="standard" name="Salvar" type='submit' disabled={!isValid}/>
      </form>
    </div>
  );
}

export default NewEvent;
