import style from './tabBar.module.css';
import house from '../../assets/House.svg';
import houseFill from '../../assets/House-1.svg';
import treePerson from '../../assets/UsersThree.svg';
import treePersonFill from '../../assets/UsersThree-1.svg';
import plusCircle from '../../assets/PlusCircle.svg';
import plusCircleFill from '../../assets/PlusCircle-1.svg';
import calendar from '../../assets/CalendarBlank.svg';
import calendarFill from '../../assets/CalendarBlank-1.svg';
import circlePerson from '../../assets/UserCircle.svg';
import circlePersonFill from '../../assets/UserCircle-1.svg';
import { SetStateAction, useState } from 'react';

function TabBar() {
  const [selected, setSelected] = useState('home');
  const handleClick = (option: SetStateAction<string>) => {
    setSelected(option);
  };
  return (
    <div className={style.tabBar}>
      <div
        className={style.containerOption}
        onClick={() => handleClick('home')}
      >
        <div className={style.containerIcon}>
          <img
            src={`${selected === 'home' ? houseFill : house}`}
            alt="Início"
          />
        </div>
        <div
          className={`${style.title} ${
            selected === 'home' ? style.selectedTitle : ''
          }`}
        >
          Início
        </div>
      </div>

      <div
        className={style.containerOption}
        onClick={() => handleClick('treePerson')}
      >
        <div className={style.containerIcon}>
          <img
            src={`${selected === 'treePerson' ? treePersonFill : treePerson}`}
            alt="Grupos"
          />
        </div>
        <div
          className={`${style.title} ${
            selected === 'treePerson' ? style.selectedTitle : ''
          }`}
        >
          Grupos
        </div>
      </div>

      <div
        className={style.containerOption}
        onClick={() => handleClick('plus')}
      >
        <div className={style.containerIcon}>
          <img
            src={`${selected === 'plus' ? plusCircleFill : plusCircle}`}
            alt="Registro"
          />
        </div>
        <div
          className={`${style.title} ${
            selected === 'plus' ? style.selectedTitle : ''
          }`}
        >
          Registro
        </div>
      </div>

      <div
        className={style.containerOption}
        onClick={() => handleClick('calendar')}
      >
        <div className={style.containerIcon}>
          <img
            src={`${selected === 'calendar' ? calendarFill : calendar}`}
            alt="Agenda"
          />
        </div>
        <div
          className={`${style.title} ${
            selected === 'calendar' ? style.selectedTitle : ''
          }`}
        >
          Agenda
        </div>
      </div>

      <div
        className={style.containerOption}
        onClick={() => handleClick('user')}
      >
        <div className={style.containerIcon}>
          <img
            src={`${selected === 'user' ? circlePersonFill : circlePerson}`}
            alt="Perfil"
          />
        </div>
        <div
          className={`${style.title} ${
            selected === 'user' ? style.selectedTitle : ''
          }`}
        >
          Perfil
        </div>
      </div>
    </div>
  );
}

export default TabBar;
