import { useQuery } from '@tanstack/react-query';
import { Modal } from '../Modal';
import PencilIcon from '@/assets/PencilSimple-1.svg';
import MapIcon from '@/assets/MapPin.svg';
import ReapetIcon from '@/assets/ArrowClockwise.svg';
import { Button } from 'antd';

interface ModalEventProps {
    closeModal: () => void
    id: string;
}

const ModalEvent = ({ closeModal, id }: ModalEventProps) => {
    const { data } = useQuery({
        queryKey: ['event',id],
        queryFn: async () => {
            const eventsList = [
                {
                id: 'c9f1f895-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
                name: 'Corrida matinal',
                startAt: '08:00',
                endAt: '10:00',
                address: 'Praia do Forte',
                date: '2023-02-15',
                description: 'Corrida noturna em uma praia',
                repeat: false
                },
                {
                id: '45f1f895-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
                name: 'Caminhada pela praia',
                startAt: '10:30',
                endAt: '12:00',
                address: 'Praia do Mucug , Itacar  - BA',
                date: '2023-02-15',
                description: 'Caminhada pela praia em uma manh  quente',
                repeat: true
                },
                {
                id: '8c7f4e2e-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
                name: 'Futebol em equipe',
                startAt: '14:00',
                endAt: '16:00',
                address: 'Est dio do Pitua  - Salvador',
                date: '2023-02-15',
                description: 'Jogo de futebol entre amigos',
                repeat: false
                },
                {
                id: '4e2e8c7f-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
                name: 'Nata o sincronizada',
                startAt: '16:30',
                endAt: '18:00',
                address: 'Piscina do Parque da Cidade',
                date: '2023-02-15',
                description: 'Aula de nata o sincronizada',
                repeat: true
                },
                {
                id: 'c9f1f895-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
                name: 'Ciclismo pelas ruas',
                startAt: '08:00',
                endAt: '10:00',
                address: 'Avenida Paralela',
                date: '2023-02-15',
                description: 'Passeio de bicicleta pelas ruas da cidade',
                repeat: false
                },
                {
                id: '45f1f895-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
                name: 'Trilha pelas montanhas',
                startAt: '10:30',
                endAt: '12:00',
                address: 'Parque da Chapada Diamantina',
                date: '2023-02-15',
                description: 'Caminhada pela trilha em uma montanha',
                repeat: true
                }
            ];

            return eventsList.find(event => event.id === id);
        }
    })

    return (
        <Modal.Root style={{ gap: '0px'}}>
            <Modal.Close onClick={() => closeModal()} />
            <Modal.Title>{data?.name}</Modal.Title>

            <Modal.SeparatorSmall />

            <Modal.DescriptionRow>
                <p>
                    {data && new Date(data?.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} - {data?.startAt} - {data?.endAt}
                </p>
            </Modal.DescriptionRow>

            <Modal.SeparatorLarge />

            <Modal.DescriptionRow>
                <Modal.Icon src={PencilIcon} />
                <Modal.CollumnSeparatorSmall />
                <p>
                    {data?.description}
                </p>
            </Modal.DescriptionRow>

            <Modal.SeparatorMedium />

            <Modal.DescriptionRow>
                <Modal.Icon src={MapIcon} />
                <Modal.CollumnSeparatorSmall />
                <p>
                    {data?.address}
                </p>
            </Modal.DescriptionRow>

            <Modal.SeparatorMedium />

            <Modal.DescriptionRow>
                <Modal.Icon src={ReapetIcon} />
                <Modal.CollumnSeparatorSmall />
                <p>
                    {data?.repeat ? `Repete todo ${new Date(data.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long' })}` : 'Evento não repete'}
                </p>
            </Modal.DescriptionRow>

            <Modal.SeparatorMedium />
            <Modal.FlexRow>
                <Button>Excluir</Button>
                <Modal.SeparatorMedium />
                <Button>Editar</Button>
            </Modal.FlexRow>

            <Modal.SeparatorLarge/>

        </Modal.Root>
    );
};

export default ModalEvent;
