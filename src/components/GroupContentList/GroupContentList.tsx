import style from "./GroupContentList.module.css";
import RequestGroupCard from "../RequestGroupCard/RequestGroupCard";
import EventGroupCard from "../EventGroupCard/EventGroupCard";
import { useState } from "react";
import peopleData from "../../mocks/peopleData.json";
import eventData from "../../mocks/eventsData.json"

type GroupContentListProps = {
    variant: 'posts' | 'requests' | 'events'| string;

}

const GroupContentList = ({variant}: GroupContentListProps) => {

    const [listPeople] = useState(peopleData)
    const [listEvent] = useState(eventData)

    return(
        variant === 'posts'? 
        <ul className={style.list_posts_container}>

        </ul>
        : variant === 'requests' ?
        <ul className={style.list_requests_container}>
            {
                listPeople.map((people) =>(
                    <RequestGroupCard 
                        id={people.id}
                        name={people.name}
                        image={people.image}
                    />
                ))
            }
        </ul> :
        <ul className={style.list_events_container}>
            {
                listEvent.map((ev) =>(
                    <EventGroupCard
                    id={ev.id}
                    name={ev.name}
                    description={ev.description}
                    address={ev.address}
                    date={ev.date}
                    initHour={ev.initHour}
                    endHour={ev.endHour}
                    />
                ))
            }
        </ul>


    )
}

export default GroupContentList