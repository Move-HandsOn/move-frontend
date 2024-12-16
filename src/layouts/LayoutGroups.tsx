import PlacerHolder from '@/assets/placeholder.png';
import Button from '@/components/Button/Button';
import GroupMenu from '@/components/GroupMenu/GroupMenu';
import { getGroupDetail, getProfile } from '@/services/requests';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import style from './LayoutGroups.module.css';
import NavBar from '@/components/NavBar/NavBar';
import TabBar from '@/components/tabBar/tabBar';
import Loading from '@/components/Loading/Loading';
import Check from '../assets/Check.svg';

const LayoutGroups = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const params = useParams() as { id: string };
  const [statusGroup, setStatusGroup] = useState<
    'posts' | 'requests' | 'events'
  >('posts');
  const navigate = useNavigate();

  const { data: profileData } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      return await getProfile();
    },
  });

  const { data: groupDetailData } = useQuery({
    queryKey: ['groups-detail', params.id],
    queryFn: async () => {
      setLoading(true);

      const responseGroups = await getGroupDetail(params.id ?? '');
      setLoading(false);
      return responseGroups[0];
    },
  });

  const adm = profileData?.id === groupDetailData?.admin?.id ? true : false;

  const isMember =
    groupDetailData?.members?.some(
      (member) => member.user_id === profileData?.id
    ) ?? false;

  useEffect(() => {
    if (location.pathname.includes('events')) {
      setStatusGroup('events');
    }
    if (location.pathname.includes('requests')) {
      setStatusGroup('requests');
    }
    if (location.pathname.includes('activities')) {
      setStatusGroup('posts');
    }
  }, [location]);

  return (
    <>
      <div className={style.navBar}>
        <NavBar title={groupDetailData?.name} />
      </div>
      <section className={style.group_header_container}>
        <div className={style.group_header_info_container}>
          <div className={style.group_header_info_img_btn_container}>
            <img
              src={groupDetailData?.group_image ?? PlacerHolder}
              alt={groupDetailData?.name}
            />
            {isMember ? (
              <div className={style.joinButton_joined}>
                <Button name={'Participando'} variant="gray" />
                <img src={Check} alt="" />
              </div>
            ) : (
              <Button name={'Participar'} variant="standard" />
            )}
          </div>
          <div className={style.group_header_info_bio_container}>
            <p>{groupDetailData?.description}</p>
          </div>
        </div>
        <GroupMenu
          isAdm={adm}
          setPosts={() => navigate(`/group-detail/${params.id}/activities`)}
          setRequests={() => navigate(`/group-detail/${params.id}/requests`)}
          setEvents={() => navigate(`/group-detail/${params.id}/events`)}
          statusGroup={statusGroup}
        />
        {<Outlet />}
      </section>
      <TabBar />
      <Loading show={loading} />
    </>
  );
};

export default LayoutGroups;
