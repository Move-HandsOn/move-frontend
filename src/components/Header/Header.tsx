import useCurrentHour from '../../hooks/useCurrentHour';
import RightSide from '../../assets/RightSide.svg';
import style from './Header.module.css';

function Header() {
  const formattedTime = useCurrentHour();
  return (
    <header className={style.header_container}>
      <p className={style.header_time}> {formattedTime} </p>
      <img src={RightSide} alt="Status Wifi e Bateria" />
    </header>
  );
}

export default Header;
