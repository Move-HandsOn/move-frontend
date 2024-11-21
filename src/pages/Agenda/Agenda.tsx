
import NavigationDays from '@/components/NavigationDays/NavigationDays';
import style from './agenda.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';
import Button from '@/components/Button/Button';
import { Link, useSearchParams } from 'react-router-dom';

function Agenda() {
  const [searchParams, setSearchParams] = useSearchParams();

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
      <Link to={"/new-event"}>
        <Button variant='standard' className={style.buttonNewEvent}><p>+</p></Button>
      </Link>
      <TabBar />
    </div>
  );
}

export default Agenda;
