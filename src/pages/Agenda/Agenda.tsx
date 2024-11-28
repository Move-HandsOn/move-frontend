
import NavigationDays from '@/components/NavigationDays/NavigationDays';
import style from './agenda.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';
import Button from '@/components/Button/Button';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ModalEvent from '@/components/ModalEvent/ModalEvent';
import { calendar } from '@/services/requests';
import dayjs from 'dayjs';

function Agenda() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventId, setEventId] = useState('');
  const [isOpenModalEvent, setIsOPenModalEvent] = useState(false);

  const { data } = useQuery({
    queryKey: ['events', searchParams.get('day')],
    queryFn: async () => {
      const day =dayjs(new Date(searchParams.get('day') ?? '')).toISOString(); 
      const events = await calendar(day ?? '');
      return events;
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

  return (<>
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
            <div key={event.event.id} className={style.event}
            onClick={()=>{
              setEventId(event.event.id);
                setIsOPenModalEvent(true);
              }}
            >
              <h1>{event.event.name}</h1>
              <p>De {dayjs(event.event.start_time).format('HH:mm')} a {dayjs(event.event.end_time).format('HH:mm')}</p>
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
      </div>
      <TabBar />
    </>
  );
}

export default Agenda;
