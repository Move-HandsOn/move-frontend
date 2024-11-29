import { categoryMap } from '@/pages/Feed/types';
import { GroupDetailResponse } from '@/services/requestTypes';
import { formatedActivityDate } from '@/utils/formatActivityDate';
import { formatDuration } from '@/utils/formatDuration';
import { Empty } from 'antd';
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
        {group.activities.length ? (
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
              isUserView={true}
              activityImages={activity.media.map((item) => item.media_url)}
              duration={formatDuration(activity.duration)}
              comments={activity.comments}
              isCurrentLike={activity.currentUserliked}
            />
          ))
        ) : (
          <div className={style.empty}>
            <Empty description="Não existem posts ainda" />
          </div>
        )}
      </ul>
    );
  }

  if (variant === 'requests') {
    return (
      <ul className={style.list_requests_container}>
        {group.groupRequests.length ? (
          group?.groupRequests.map((req) => (
            <RequestGroupCard
              id={req.user_id}
              name={req.user.name}
              image={req.user.name}
            />
          ))
        ) : (
          <div className={style.empty}>
            <Empty description="Não existem solicitações de entrada" />
          </div>
        )}
      </ul>
    );
  }

  return (
    <ul className={style.list_events_container}>
      {group.events.length ? (
        group?.events.map((ev) => (
          <EventGroupCard
            id={ev.id}
            name={ev.name}
            description={ev.description}
            address={ev.address}
            date={ev.event_date}
            initHour={ev.start_time}
          />
        ))
      ) : (
        <div className={style.empty}>
          <Empty description="Não existem eventos ainda" />
        </div>
      )}
    </ul>
  );
};

export default GroupContentList;
