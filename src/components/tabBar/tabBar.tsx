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
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function TabBar() {
  const [selected, setSelected] = useState<string>('home');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/feed')) setSelected('home');
    else if (path.includes('/groups')) setSelected('treePerson');
    else if (path.includes('/new-activity')) setSelected('plus');
    else if (path.includes('/schedule')) setSelected('calendar');
    else if (path.includes('/profile')) setSelected('user');
  }, [location]);

  return (
    <div className={style.tabBar}>
      <NavLink to="/feed" onClick={() => setSelected('home')}>
        <div className={style.containerOption}>
          <div className={style.containerIcon}>
            <img src={selected === 'home' ? houseFill : house} alt="Início" />
          </div>
          <div
            className={`${style.title} ${selected === 'home' ? style.selectedTitle : ''}`}
          >
            Início
          </div>
        </div>
      </NavLink>

      <NavLink to="/groups" onClick={() => setSelected('treePerson')}>
        <div className={style.containerOption}>
          <div className={style.containerIcon}>
            <img
              src={selected === 'treePerson' ? treePersonFill : treePerson}
              alt="Grupos"
            />
          </div>
          <div
            className={`${style.title} ${selected === 'treePerson' ? style.selectedTitle : ''}`}
          >
            Grupos
          </div>
        </div>
      </NavLink>

      <NavLink to="/new-activity" onClick={() => setSelected('plus')}>
        <div className={style.containerOption}>
          <div className={style.containerIcon}>
            <img
              src={selected === 'plus' ? plusCircleFill : plusCircle}
              alt="Registro"
            />
          </div>
          <div
            className={`${style.title} ${selected === 'plus' ? style.selectedTitle : ''}`}
          >
            Registro
          </div>
        </div>
      </NavLink>

      <NavLink to="/schedule" onClick={() => setSelected('calendar')}>
        <div className={style.containerOption}>
          <div className={style.containerIcon}>
            <img
              src={selected === 'calendar' ? calendarFill : calendar}
              alt="Agenda"
            />
          </div>
          <div
            className={`${style.title} ${selected === 'calendar' ? style.selectedTitle : ''}`}
          >
            Agenda
          </div>
        </div>
      </NavLink>

      <NavLink to="/profile" onClick={() => setSelected('user')}>
        <div className={style.containerOption}>
          <div className={style.containerIcon}>
            <img
              src={selected === 'user' ? circlePersonFill : circlePerson}
              alt="Perfil"
            />
          </div>
          <div
            className={`${style.title} ${selected === 'user' ? style.selectedTitle : ''}`}
          >
            Perfil
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default TabBar;
