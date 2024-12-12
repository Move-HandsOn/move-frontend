import { getGroupDetail } from '@/services/requests';
import style from './RequestsByGroups.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Empty } from 'antd';
import { useState } from 'react';
import Loading from '@/components/Loading/Loading';
import RequestGroupCard from '@/components/RequestGroupCard/RequestGroupCard';
import { IGroupRequests } from '@/services/requestTypes';

export const RequestsByGroups = () => {    
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

  
  return (
    <ul className={style.list_requests_container}>
      {groupDetailData?.groupRequests.length ? (
        groupDetailData.groupRequests.map((requestUser: IGroupRequests) => (
          <RequestGroupCard
            id={requestUser.id}
            name={requestUser.user.name}
            image={requestUser.user.profile_image}
          />
        ))
      ) : (
        <div className={style.empty}>
          <Empty description="Não existem solicitações de entrada" />
        </div>
      )}
      <Loading show={loading} />
    </ul>
  );
}

