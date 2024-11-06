import style from '../Feed/Feed.module.css';
import GroupCard from '@/components/GroupCard/GroupCard';
import GroupData from '../../mocks/groupData.json';
import { useState } from 'react';
import Posts from '@/components/Posts/Posts';
import PostsData from '../../mocks/postsData.json';
import CommentsModal from '../../components/CommentsModal/CommentsModal';

function Feed() {
  const [openModal, setOpenModal] = useState(false);
  const [groups] = useState(GroupData);
  const [posts] = useState(
    PostsData.filter((post) => !post.activityImage && !post.isUserView)
  );

  const handleJoinGroup = (groupId: number) => {
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
