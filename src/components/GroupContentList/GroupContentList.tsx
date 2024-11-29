import { useState } from 'react';
import eventData from '../../mocks/eventsData.json';
import peopleData from '../../mocks/peopleData.json';
import EventGroupCard from '../EventGroupCard/EventGroupCard';
import RequestGroupCard from '../RequestGroupCard/RequestGroupCard';
import style from './GroupContentList.module.css';
import Activity from '../Activity/Activity';
// import { allGroupsRequest } from '@/services/requests';

interface IMember {
  id: string;
  name: string;
  email?: string;
  profile_image: string;
  gender?: string | null;
}

interface IGroupRequest {
  id?: string;
  group_id?: string;
  user_id?: string;
  status: 'pending' | 'accepted' | 'rejected' | string;
  user: IMember;
}

interface IEvent {
  id: string | number;
  name: string;
  date?: string;
  address?: string;
  is_recurring?: boolean;
  recurrence_interval?: boolean;
  start_time?: string;
  description: string;
  event_type?: 'group' | 'private' | 'profile';
}

interface IComments {
  id: string;
  activity_id: string;
  post_id: string | null;
  comment_text: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: {
    name: string;
    profile_image: string;
  };
  likes: string[];
};


interface IActivities {
  id: string;
  author: {
    name?: string;
    image?: string;
  };
  content: string;
  postDate: string;
  commentsCount: number;
  likes: number;
  activityImages?: string[] | null;
  onOpenComments: () => void;
  handleCloseModalComments: () => void;
  openModal: boolean;
  isUserView: boolean;
  onDeletePost?: (id: string) => void;
  showOptions?: boolean;
  categoryName: string;
  duration: string;
  comments: IComments[];
  isCurrentLike?: boolean;
}


interface IGroup {
  id: string | number;
  name: string;
  description: string;
  group_image: string;
  group_type: 'public' | 'private' | string;
  category_id?: number;
  admin_id?: number | null;
  created_at: string | Date;
  members: IMember[];
  groupRequests: IGroupRequest[];
  events: IEvent[];
  activities: IActivities[];
  status?: string | null | undefined;
}

type GroupContentListProps = {
  variant: 'posts' | 'requests' | 'events' | string;
  group?: IGroup
};

const GroupContentList = ({ variant, group }: GroupContentListProps) => {
  const [listPeople] = useState(peopleData);
  const [listEvent] = useState(eventData);
  const [openModal, setOpenModal] = useState(false);



  const handleOpenModalComments = () => {
    setOpenModal(true);
  };

  const handleCloseModalComments = () => {
    setOpenModal(false);
  };


  return variant === 'posts' ? (
    <ul className={style.list_posts_container}>
      {group?.activities.map((act) => (
        <Activity 
          id={act.id}
        />
      ))}
    </ul>
  ) : variant === 'requests' ? (
    <ul className={style.list_requests_container}>
      {group?.groupRequests.map((req) => (
        <RequestGroupCard
          id={req.user_id}
          name={req.user.name}
          image={req.user.name}
        />
      ))}
    </ul>
  ) : (
    <ul className={style.list_events_container}>
      {group?.events.map((ev) => (
        <EventGroupCard
          id={ev.id}
          name={ev.name}
          description={ev.description}
          address={ev.address}
          date={ev.date}
          initHour={ev.start_time}
        />
      ))}
    </ul>
  );
};

export default GroupContentList;
