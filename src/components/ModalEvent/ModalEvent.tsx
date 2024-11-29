import { useQuery } from '@tanstack/react-query';
import { Modal } from '../Modal';
import PencilIcon from '@/assets/PencilSimple.svg';
import MapIcon from '@/assets/MapPin.svg';
import ReapetIcon from '@/assets/ArrowClockwise.svg';
import Button from '../Button/Button';
import Trash from '@/assets/Trash.svg';
import { findEventById } from '@/services/requests';
import dayjs from 'dayjs';
import style from './modalEvent.module.css';

interface ModalEventProps {
  closeModal: () => void;
  id: string;
}

const ModalEvent = ({ closeModal, id }: ModalEventProps) => {
  const { data } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const response = await findEventById(id);
      return response;
    },
  });

  return (
    <Modal.Root style={{ gap: '0px' }}>
      <div className={style.overlay}>
        <div className={style.modalContent}>
          <Modal.Close onClick={() => closeModal()} />
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
            >
              <Modal.Icon src={Trash}></Modal.Icon>
              Excluir
            </Button>
            <Modal.CollumnSeparatorSmall />
            <Button
              variant="gray"
              style={{
                width: '100%',
                flexDirection: 'row',
              }}
            >
              <Modal.Icon src={PencilIcon}></Modal.Icon>
              Editar
            </Button>
          </Modal.FlexRow>

          <Modal.SeparatorLarge />
        </div>
      </div>
    </Modal.Root>
  );
};

export default ModalEvent;
