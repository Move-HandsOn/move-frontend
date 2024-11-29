import style from './EventGroupCard.module.css';
import Button from '../Button/Button';
import calendar from '../../assets/CalendarBlank.svg';
import clock from '../../assets/Clock.svg';
import mapPin from '../../assets/MapPin.svg';

type EventGroupCardProps = {
  id?: number | string;
  name: string;
  description: string;
  address?: string;
  date?: string | Date; // Agora pode ser opcional
  initHour?: string | Date; // Agora pode ser opcional
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
            {typeof date === 'string'
              ? date
              : new Date(date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
          </p>
        )}
        {initHour && (
          <p className={style.event_card_icons_icon_container}>
            <img src={clock} alt="horário" />
            {typeof initHour === 'string'
              ? initHour
              : new Date(initHour).toLocaleTimeString([], {
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
