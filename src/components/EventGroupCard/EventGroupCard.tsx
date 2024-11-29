import calendar from '../../assets/CalendarBlank.svg';
import clock from '../../assets/Clock.svg';
import mapPin from '../../assets/MapPin.svg';
import Button from '../Button/Button';
import style from './EventGroupCard.module.css';

type EventGroupCardProps = {
  id: string;
  name: string;
  description: string;
  address?: string;
  date?: string | Date;
  initHour?: string | Date;
};

const EventGroupCard = ({
  id,
  name,
  description,
  address,
  date,
  initHour,
}: EventGroupCardProps) => {
  return (
    <li key={id} className={style.event_card_container}>
      <h3>{name}</h3>
      <div className={style.event_card_bio_container}>
        <p>{description}</p>
      </div>
      <div className={style.event_card_icons_container}>
        {address && (
          <p className={style.event_card_icons_icon_container}>
            <img src={mapPin} alt="endereço" />
            {address}
          </p>
        )}
        {date && (
          <p className={style.event_card_icons_icon_container}>
            <img src={calendar} alt="data" />
            {new Date(date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        )}
        {initHour && (
          <p className={style.event_card_icons_icon_container}>
            <img src={clock} alt="horário" />
            {new Date(initHour).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
      <Button variant="standard" name="Adicionar na Agenda" />
    </li>
  );
};

export default EventGroupCard;
