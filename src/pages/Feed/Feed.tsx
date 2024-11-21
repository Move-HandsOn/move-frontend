import style from '../Feed/Feed.module.css';
import GroupCard from '@/components/GroupCard/GroupCard';
import { useState, useEffect } from 'react';
import Posts from '@/components/Posts/Posts';
import PostsData from '../../mocks/postsData.json';
import CommentsModal from '../../components/CommentsModal/CommentsModal';
import { allGroupsRequest } from '@/services/requests';

interface IGroups {
  created_at: Date;
  description: string;
  group_image: string;
  id: string;
  name: string;
  members?: unknown[];
  group_type?: string;
  isParticipation: boolean;
  onJoin: () => void;
}

function Feed() {
  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useState<IGroups[]>([]);
  const [posts] = useState(
    PostsData.filter((post) => !post.activityImage && !post.isUserView)
  );

  useEffect(() => {
    const fetchGroups = async () => {
      const responseGroups: IGroups[] = await allGroupsRequest();
      setGroups(responseGroups)
    };
    fetchGroups();
  }, []);

  const handleJoinGroup = (groupId: string) => {
    console.log(`Usuário quer participar do grupo ${groupId}`);
  };

  const handleOpenModalComments = () => {
    setOpenModal(true);
  };

  const handleCloseModalComments = () => {
    setOpenModal(false);
  };

  return (
    <div className={style.feed_container}>
      <h1 className={style.header_title}>Olá, Natália Oliveira! </h1>
      <h3 className={style.group_section}>Grupos de atividades</h3>

      <div className={style.groupsContainer}>
        {groups.map((group) => (
          <div className={style.cardWrapper} key={group.id}>
            <GroupCard {...group} onJoin={() => handleJoinGroup(group.id)} />
          </div>
        ))}
      </div>

      <div>
        {posts.map((post) => (
          <Posts
            key={post.id}
            {...post}
            onOpenComments={handleOpenModalComments}
            showOptions={false}
          />
        ))}
        <CommentsModal open={openModal} onClose={handleCloseModalComments} />
      </div>
      <div className={style.tabBox}></div>
    </div>
  );
}

export default Feed;
