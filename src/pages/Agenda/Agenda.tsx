
import NavigationDays from '@/components/NavigationDays/NavigationDays';
import style from './agenda.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';
import Button from '@/components/Button/Button';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ModalEvent from '@/components/ModalEvent/ModalEvent';

function Agenda() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventId, setEventId] = useState('');
  const [isOpenModalEvent, setIsOPenModalEvent] = useState(false);

  const { data } = useQuery({
    queryKey: ['events', searchParams.get('day')],
    queryFn: async () => {
      return [
        {
          id: 'c9f1f895-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
          name: 'Corrida matinal',
          startAt: '08:00',
          endAt: '10:00'
        },
        {
          id: '45f1f895-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
          name: 'Caminhada pela praia',
          startAt: '10:30',
          endAt: '12:00'
        },
        {
          id: '8c7f4e2e-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
          name: 'Futebol em equipe',
          startAt: '14:00',
          endAt: '16:00'
        },
        {
          id: '4e2e8c7f-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
          name: 'Nata o sincronizada',
          startAt: '16:30',
          endAt: '18:00'
        },
        {
          id: 'c9f1f895-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
          name: 'Ciclismo pelas ruas',
          startAt: '08:00',
          endAt: '10:00'
        },
        {
          id: '45f1f895-6d9f-4e2e-8c7f-4e2e8c7f4e2e',
          name: 'Trilha pelas montanhas',
          startAt: '10:30',
          endAt: '12:00'
        }
      ];
    }
  })

  const selectDay = (day: string) => {
    setSearchParams(params => {
      params.set('day', day);
      return params
    })
  };

  const selectIntervalDays =(selectIntervalDays: string) => {
    setSearchParams(params => {
      params.set('selectIntervalDays', selectIntervalDays);
      return params
    })
  };

  return (
    <div className={style.container}>
      <NavBar title="Agenda" />
      <NavigationDays 
        selectedDay={searchParams.get('day') || ''}
        setSelectedDay={selectDay}  
        selectedInterval={searchParams.get('selectIntervalDays') || ''}
        setSelectedInterval={selectIntervalDays}
      />
      <div className={style.containerEvents}>
        {data?.map(event => (
          <div key={event.id} className={style.event}
            onClick={()=>{
              setEventId(event.id);
              setIsOPenModalEvent(true);
            }}
          >
            <h1>{event.name}</h1>
            <p>De {event.startAt} a {event.endAt}</p>
          </div>
        ))}
      </div>
      <Link to={"/new-event"}>
        <Button variant='standard' className={style.buttonNewEvent}><p>+</p></Button>
      </Link>
      {
       isOpenModalEvent && <ModalEvent id={eventId} closeModal={() => {
        setEventId('');
        setIsOPenModalEvent(false);
      }}></ModalEvent>
      }
      <TabBar />
    </div>
  );
}

export default Agenda;
