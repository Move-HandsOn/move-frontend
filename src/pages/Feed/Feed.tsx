import style from '../Feed/Feed.module.css';
import Header from '@/components/Header/Header';
import GroupCard from '@/components/GroupCard/GroupCard';
import GroupData from '../../mocks/groupData.json';
import { useState } from 'react';

function Feed() {
  const [groups] = useState(GroupData);

  const handleJoinGroup = (groupId: number) => {
    console.log(`Usuário quer participar do grupo ${groupId}`);
  };

  return (
    <div className={style.feed_container}>
      <Header title="Início" />
      <h1 className={style.header_title}>Olá, Natália Oliveira! </h1>
      <h3 className={style.group_section}>Grupos de atividades</h3>

      <div className={style.groupsContainer}>
        {groups.map((group) => (
          <div className={style.cardWrapper} key={group.id}>
            <GroupCard {...group} onJoin={() => handleJoinGroup(group.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
