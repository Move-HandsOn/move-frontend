import { categoryMap } from '@/pages/Feed/types';
import { GroupDetailResponse } from '@/services/requestTypes';
import { formatedActivityDate } from '@/utils/formatActivityDate';
import { formatDuration } from '@/utils/formatDuration';
import Activity from '../Activity/Activity';
import EventGroupCard from '../EventGroupCard/EventGroupCard';
import RequestGroupCard from '../RequestGroupCard/RequestGroupCard';
import style from './GroupContentList.module.css';

type GroupContentListProps = {
  variant: 'posts' | 'requests' | 'events';
  group?: GroupDetailResponse;
};

const GroupContentList = ({ variant, group }: GroupContentListProps) => {
  if (!group) return <h1>Carregando...</h1>;

  if (variant === 'posts' && group.activities) {
    return (
      <ul className={style.list_posts_container}>
        {group.activities &&
          group?.activities.map((activity) => (
            <Activity
              description={activity.description ?? ''}
              id={activity.id}
              likes={Number(activity.likes.length)}
              author={{
                name: activity.user.name,
                image: activity.user.profile_image,
              }}
              categoryName={categoryMap[activity.category_id]}
              key={activity.id}
              commentsCount={activity.comments.length}
              postDate={formatedActivityDate(activity.created_at)}
              isUserView={false}
              activityImages={activity.media.map((item) => item.media_url)}
              duration={formatDuration(activity.duration)}
              comments={activity.comments}
              isCurrentLike={activity.currentUserliked}
            />
          ))}
      </ul>
    );
  }

  if (variant === 'requests') {
    return (
      <ul className={style.list_requests_container}>
        {group?.groupRequests.map((req) => (
          <RequestGroupCard
            id={req.user_id}
            name={req.user.name}
            image={req.user.name}
          />
        ))}
      </ul>
    );
  }

  return (
    <ul className={style.list_events_container}>
      {group?.events.map((ev) => (
        <EventGroupCard
          id={ev.id}
          name={ev.name}
          description={ev.description}
          address={ev.address}
          date={ev.event_date}
          initHour={ev.start_time}
        />
      ))}
    </ul>
  );
};

export default GroupContentList;
