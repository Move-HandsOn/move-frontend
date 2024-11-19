
import NavigationDays from '@/components/NavigationDays/NavigationDays';
import style from './agenda.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';
import Button from '@/components/Button/Button';
import plus from '@/assets/PlusWhite.png'
import { Link } from 'react-router-dom';

function Agenda() {
  return (
    <div className={style.container}>
      <NavBar title="Agenda" />
      <NavigationDays />
      <Link to={"/new-event"}>
        <Button variant='standard' className={style.buttonNewEvent} ><img src={plus}></img></Button>
      </Link>
      <TabBar />
    </div>
  );
}

export default Agenda;
