
import NavigationDays from '@/components/NavigationDays/NavigationDays';
import style from './agenda.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';

function Agenda() {
  return (
    <div className={style.container}>
      <NavBar title="Agenda" />
      <NavigationDays />
      <TabBar />
    </div>
  );
}

export default Agenda;
