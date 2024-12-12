import { getGroupDetail } from '@/services/requests';
import style from './EventsByGroups.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import EventGroupCard from '@/components/EventGroupCard/EventGroupCard';
import { Empty } from 'antd';
import { useState } from 'react';
import Loading from '@/components/Loading/Loading';

export const EventsByGroups = () => {    
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

  
  return (<section className={style.list_events_container}>
    {groupDetailData?.events.length ? (
      groupDetailData?.events.map((event) => (
        <EventGroupCard
          id={event.id}
          name={event.name}
          description={event.description}
          address={event.address}
          date={event.event_date}
          initHour={event.start_time}
        />
      ))
    ) : (
      <div className={style.empty}>
        <Empty description="Não existem eventos ainda" />
      </div>
    )}
    <Loading show={loading} />
  </section>)
}