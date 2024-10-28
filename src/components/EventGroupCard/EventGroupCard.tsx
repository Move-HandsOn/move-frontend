import style from "./EventGroupCard.module.css";
import Button from "../Button/Button";
import calendar from "../../assets/CalendarBlank.svg"
import clock from "../../assets/Clock.svg"
import mapPin from "../../assets/MapPin.svg"

type EventGroupCardProps = {
    id: number,
    name: string,
    description: string,
    address: string,
    date: string,
    initHour: string,
    endHour: string
}

const EventGroupCard = ({id, name, description, address, date, initHour, endHour}: EventGroupCardProps) => {

    return(
        <li key={id} className={style.event_card_container}>
            <h3>{name}</h3>
            <div className={style.event_card_bio_container}>
            <p>{description}</p>
            </div>
            <div className={style.event_card_icons_container}>
            <p className={style.event_card_icons_icon_container}><img src={mapPin} alt="endereço" />{address}</p>
            <p className={style.event_card_icons_icon_container}><img src={calendar} alt="data" />{date}</p>
            <p className={style.event_card_icons_icon_container}><img src={clock} alt="horário" />{initHour} até {endHour}</p>
            </div>
            <Button 
                variant="standard"
                name="Adicionar na Agenda"
            />
        </li>
    )
}

export default EventGroupCard