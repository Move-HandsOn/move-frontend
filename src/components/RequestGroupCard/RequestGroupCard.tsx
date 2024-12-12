import style from './RequestGroupCard.module.css';
import check from '../../assets/Check.svg';
import xCircle from '../../assets/XCircle.png';
import { acceptRequest, rejectRequest } from '@/services/requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GroupDetailResponse } from '@/services/requestTypes';
import { useState } from 'react';
import Loading from '@/components/Loading/Loading';
import { useParams } from 'react-router-dom';

type RequestGroupCardProps = {
  id: string;
  name: string;
  image: string; 
};

const RequestGroupCard = ({ id, name, image }: RequestGroupCardProps) => {
  const params = useParams() as { id: string };
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();


  const removedRequestOnSucces = () => {
    const groupData = queryClient.getQueryData(['groups-detail', params.id]) as GroupDetailResponse;
    const newRequests = groupData.groupRequests.filter((requestCached) => {
      return requestCached.id !== id;
    })
    queryClient.setQueryData(['groups-detail', params.id], (oldData: GroupDetailResponse | undefined) => {
      return {
        ...oldData,
        groupRequests: newRequests
      };
    });
    setLoading(false)
  }

  const { mutateAsync: accept } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      await acceptRequest({requestId: id, groupId: params.id});
      removedRequestOnSucces()
    },
    onError: () => {
      setLoading(false);
    }
  })

  const { mutateAsync: reject } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      await rejectRequest({requestId: id, groupId: params.id});
      removedRequestOnSucces()
    },
    onError: () => {
      setLoading(false);
    }
  })


  return (
    <li key={id} className={style.card_request}>
      <div className={style.card_request_people}>
        <img src={image} alt={name} />
        <p>{name}</p>
      </div>
      <div className={style.card_request_check}>
        <img src={check} alt="check" 
          onClick={()=> {
            accept()
          }}
        />
        <img src={xCircle} alt="reject" 
          onClick={()=> {
            reject()
          }}
        />
      </div>
      <Loading show={loading} />
    </li>
  );
};

export default RequestGroupCard;
