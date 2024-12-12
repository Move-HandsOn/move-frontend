import { getGroupDetail } from '@/services/requests';
import style from './ActivitiesByGroups.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Empty } from 'antd';
import { useState } from 'react';
import Loading from '@/components/Loading/Loading';
import { categoryMap } from '../Feed/types';
import { formatedActivityDate } from '@/utils/formatActivityDate';
import { formatDuration } from '@/utils/formatDuration';
import Activity from '@/components/Activity/Activity';

export const ActivitiesByGroups = () => {    
  const params = useParams() as { id: string };
  const [loading, setLoading] = useState(false);
  
  const { data: groupDetailData } = useQuery({
    queryKey: ['groups-detail', params.id],
    queryFn: async () => {
      setLoading(true);
      const responseGroups = await getGroupDetail(params.id ?? '');
      setLoading(false);
      return responseGroups[0];
    },
  });

  
  return (<section className={style.list_activities_container}>
      {groupDetailData?.activities.length ? (
        groupDetailData?.activities.map((activity) => (
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
          <Loading show={loading} />
    </section>
  );
}