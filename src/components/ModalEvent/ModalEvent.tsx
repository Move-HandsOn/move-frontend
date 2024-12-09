import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Modal } from '../Modal';
import PencilIcon from '@/assets/PencilSimple.svg';
import MapIcon from '@/assets/MapPin.svg';
import ReapetIcon from '@/assets/ArrowClockwise.svg';
import Button from '../Button/Button';
import Trash from '@/assets/Trash.svg';
import { deleteEvent, findEventById } from '@/services/requests';
import dayjs from 'dayjs';
import style from './modalEvent.module.css';
import DeleteEventModal from '../DeleteEventModal/DeleteEventModal';
import { useState } from 'react';
import { CalendarResponse } from './types';
import Loading from '../../components/Loading/Loading';

interface ModalEventProps {
  closeModal: () => void;
  id: string;
}

const ModalEvent = ({ closeModal, id }: ModalEventProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpenModalDeleteEvent, setIsOpenModalDeleteEvent] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const response = await findEventById(id);
      return response;
    },
  });

  const { mutateAsync: deleteEventFn } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      await deleteEvent(id);
    },
    onSuccess: () => {
      const formatedHour = dayjs(data?.event_date)
        .add(12, 'hours')
        .format('YYYY-MM-DD');
      queryClient.setQueryData(
        ['calendar', formatedHour],
        (oldData: CalendarResponse[]) => {
          const newCalendar: CalendarResponse[] = oldData.filter(
            (event) => event.event.id !== data?.id
          );
          return newCalendar;
        }
      );
      setLoading(false);
      closeModal();
    },
  });

  return (
    <Modal.Root style={{ gap: 0 }}>
      <div className={style.overlay}>
        <div className={style.modalContent}>
          <Modal.Close onClick={closeModal} />
          <Modal.Title>{data?.name}</Modal.Title>

          <Modal.SeparatorSmall />

          <Modal.DescriptionRow>
            <p>
              {data &&
                new Date(data?.event_date).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}{' '}
              - {data && dayjs(data?.start_time).format('HH:mm')} -{' '}
              {data && dayjs(data?.end_time).format('HH:mm')}
            </p>
          </Modal.DescriptionRow>

          <Modal.SeparatorLarge />

          <Modal.DescriptionRow>
            <Modal.Icon src={PencilIcon} />
            <Modal.CollumnSeparatorSmall />
            <p>{data?.description}</p>
          </Modal.DescriptionRow>

          <Modal.SeparatorMedium />

          <Modal.DescriptionRow>
            <Modal.Icon src={MapIcon} />
            <Modal.CollumnSeparatorSmall />
            <p>{data?.address}</p>
          </Modal.DescriptionRow>

          <Modal.SeparatorMedium />

          <Modal.DescriptionRow>
            <Modal.Icon src={ReapetIcon} />
            <Modal.CollumnSeparatorSmall />
            <p>
              {data?.is_recurring
                ? `Repete todo ${new Date(data.event_date).toLocaleDateString('pt-BR', { weekday: 'long' })}`
                : 'Evento não repete'}
            </p>
          </Modal.DescriptionRow>

          <Modal.SeparatorMedium />
          <Modal.FlexRow>
            <Button
              variant="white"
              style={{
                width: '100%',
                flexDirection: 'row',
                color: '#D30303',
              }}
              onClick={() => setIsOpenModalDeleteEvent(true)}
            >
              <Modal.Icon src={Trash}></Modal.Icon>
              Excluir
            </Button>
            <Modal.CollumnSeparatorSmall />
          </Modal.FlexRow>

          <Modal.SeparatorLarge />
        </div>
        {isOpenModalDeleteEvent && (
          <DeleteEventModal
            open={isOpenModalDeleteEvent}
            onClose={() => setIsOpenModalDeleteEvent(false)}
            onDelete={() => {
              deleteEventFn();
              setIsOpenModalDeleteEvent(false);
            }}
          />
        )}
      </div>
      <Loading show={loading} />
    </Modal.Root>
  );
};

export default ModalEvent;
