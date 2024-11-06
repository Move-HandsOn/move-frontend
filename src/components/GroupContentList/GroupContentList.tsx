import style from "./GroupContentList.module.css";
import RequestGroupCard from "../RequestGroupCard/RequestGroupCard";
import EventGroupCard from "../EventGroupCard/EventGroupCard";
import Posts from "../Posts/Posts";
import CommentsModal from "../CommentsModal/CommentsModal";
import { useState } from "react";
import peopleData from "../../mocks/peopleData.json";
import eventData from "../../mocks/eventsData.json"
import postData from "../../mocks/postsData.json";

type GroupContentListProps = {
    variant: 'posts' | 'requests' | 'events'| string;

}

const GroupContentList = ({variant}: GroupContentListProps) => {

    const [listPeople] = useState(peopleData)
    const [listEvent] = useState(eventData)
    const [listPost] = useState(postData)
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModalComments = () => {
        setOpenModal(true);
      };
    
      const handleCloseModalComments = () => {
        setOpenModal(false);
      };

    return(
        variant === 'posts'? 
        <ul className={style.list_posts_container}>
            {listPost.map((post) => (
          <Posts
            key={post.id}
            id={post.id}
            postDate={post.postDate}
            author={post.author}
            content={post.content}
            commentsCount={post.commentsCount}
            likes={post.likes}
            likedByCurrentUser={post.likedByCurrentUser}
            onOpenComments={handleOpenModalComments}
          />
        ))}
        <CommentsModal open={openModal} onClose={handleCloseModalComments} />
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