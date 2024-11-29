import Button from '@/components/Button/Button';
import InputStd from '@/components/InputStd/InputStd';
import ModalSelectGroup from '@/components/ModalSelectGroup/ModalSelectGroup';
import NavBar from '@/components/NavBar/NavBar';
import SelectGroup from '@/components/SelectGroup/SelectGroup';
import { TextArea } from '@/components/TextArea/TextArea';
import { myGroupsRequest, newEventRequest } from '@/services/requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DatePicker, TimePicker } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import style from './NewEvent.module.css';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import {
  CalendarResponse,
  dataEventValidSchema,
  IDataEventValidSchema,
  NewEventResponse,
  TIME_FORMAT,
} from './types';

function NewEvent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['myGroups'],
    queryFn: async () => {
      const response = await myGroupsRequest();
      return response;
    },
  });

  const [isGroupPublish, setIsGroupPublish] = useState(false);
  const [modalSelectGroups, setModalSelectGroups] = useState(false);
  const [selectGroup, setSelectGroup] = useState<
    { name: string; idGroup: string } | undefined
  >();

  const handleGroupPublish = () => {
    setIsGroupPublish(!isGroupPublish);
  };

  const handleGroup = (group: { name: string; idGroup: string }) => {
    setSelectGroup(group);
    setValue('group_id', group.idGroup);
    setValue('event_type', 'group');
    setModalSelectGroups(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
    watch,
  } = useForm<IDataEventValidSchema>({
    resolver: zodResolver(dataEventValidSchema),
    defaultValues: {
      event_type: 'private',
    },
  });

  const { mutateAsync: createAsync } = useMutation({
    mutationFn: async (data: IDataEventValidSchema) => {
      return await newEventRequest({
        name: data.name,
        event_date: data.event_date.toISOString(),
        address: data.address,
        start_time: data.start_time.toISOString(),
        end_time: data.end_time.toISOString(),
        event_type: data.event_type,
        is_recurring: data.is_recurring,
        recurrence_interval: data.recurrence_interval,
        description: data.description,
        group_id: data.group_id,
      });
    },
    onSuccess: (newEventObject: NewEventResponse) => {
      const createdEventDate = dayjs(watch('event_date')).format('YYYY-MM-DD');
      queryClient.setQueryData(['calendar', createdEventDate], (oldData: CalendarResponse[]) => {
        return [...oldData, {
          event: {
            id: newEventObject.id,
            name: newEventObject.name,
            event_date: newEventObject.event_date,
            address: newEventObject.address,
            is_recurring: newEventObject.is_recurring,
            recurrence_interval: newEventObject.recurrence_interval,
            start_time: newEventObject.start_time,
            end_time: newEventObject.end_time,
            description: newEventObject.description ?? '',
            created_at: newEventObject.created_at,
            event_type: newEventObject.event_type,
            user_id: newEventObject.user_id,
            group_id: newEventObject.group_id ?? '',
            user: {
              id: newEventObject.user_id,
              name: newEventObject.user.name ?? '',
              profile_image: newEventObject.user.profile_image ?? '',
            },
          }
        }];
      });
      navigate(
        `/schedule?day=${createdEventDate}&selectIntervalDays=${createdEventDate}`
      );
    },
  });

  const onSubmit = (data: IDataEventValidSchema) => {
    createAsync(data);
  };

  return (
    <div className={style.container}>
      <NavBar title="Novo Evento" />
      <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.register}>
          <div className={style.group}>
            <h3>Detalhes do evento</h3>
            <InputStd
              style={{ width: '100%' }}
              placeholder="Título do evento"
              {...register('name')}
            />
            <TextArea
              id="activity-details"
              placeholder="Descrição (Opcional)"
              {...register('description')}
            ></TextArea>
            <InputStd
              style={{ width: '100%' }}
              placeholder="Local (Escreva a Localização)"
              {...register('address')}
            />
            <DatePicker
              placeholder="Quando?"
              className={style.datepicker}
              onChange={(date) =>
                setValue('event_date', date.toDate(), { shouldValidate: true })
              }
            />
            <div className={style.inputs_durations}>
              <TimePicker
                placeholder="Inicio"
                className={style.datepicker}
                format={TIME_FORMAT}
                onChange={(date) =>
                  setValue('start_time', date.toDate(), {
                    shouldValidate: true,
                  })
                }
              />
              <TimePicker
                placeholder="Fim"
                className={style.datepicker}
                format={TIME_FORMAT}
                onChange={(date) =>
                  setValue('end_time', date.toDate(), { shouldValidate: true })
                }
              />
            </div>
            <h3>Compartilhamento(Opcional)</h3>
            <div className={style.flex_row_gap_12}>
              <input
                type="checkbox"
                name="profile"
                onChange={({ target }) =>
                  target.checked
                    ? setValue('event_type', 'profile')
                    : setValue('event_type', 'private')
                }
              />
              <p>Compartilhar evento no meu perfil</p>
            </div>
            <div className={style.flex_row_gap_12}>
              <input
                type="checkbox"
                name="group"
                onChange={handleGroupPublish}
              />
              <p>Adicionar evento em um grupo</p>
            </div>
            {isGroupPublish && (
              <SelectGroup
                options={data?.map((group) => group.name) || []}
                value={selectGroup?.name ?? ''}
                onClick={() => setModalSelectGroups(true)}
              />
            )}
            {modalSelectGroups && (
              <ModalSelectGroup
                options={
                  data?.map(({ id, name, group_image }) => ({
                    id,
                    name,
                    image: group_image ?? '',
                  })) ?? []
                }
                closeModal={() => {
                  setModalSelectGroups(false);
                }}
                handleGroup={handleGroup}
              />
            )}
          </div>
        </div>
        <Button
          variant="standard"
          name="Salvar"
          type="submit"
          disabled={!isValid}
        />
      </form>
    </div>
  );
}

export default NewEvent;
