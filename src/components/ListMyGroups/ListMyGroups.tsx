import { useState, useEffect } from 'react';
import style from './ListMyGroups.module.css';
import RectangleGroup from '../RectangleGroup/RectangleGroup';
import GroupCard from '../GroupCard/GroupCard';
import { myGroupsRequest, allGroupsRequest } from '@/services/requests';

type ListMyGroupsProps = React.ComponentProps<'ul'> & {
  variant: 'myGroups' | 'otherGroups' | string;
};

interface GroupsProps {
  created_at: Date,
  description: string,
  group_image: string,
  id: string,
  name: string,
  variant?: string
}

const ListMyGroups = ({ variant, ...props }: ListMyGroupsProps) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<GroupsProps[]>([]);
  const myGroups = groups.filter((gpr) =>
    gpr.name.split('').some((letter) => letter.toLocaleLowerCase() === 'i')
  );
  
  useEffect(()=>{
    const fetchGroups = async () => {
      const stateList = variant === 'myGroups' ? await myGroupsRequest() : await allGroupsRequest()
      setGroups(stateList)
    }
  })

  

  const handleJoinGroup = (groupId: string) => {
    console.log(`Usuário quer participar do grupo ${groupId}`);
  };

  return (
    <ul
      className={
        variant === 'myGroups'
          ? style.list_my_groups_container
          : style.list_other_groups_containe
      }
      {...props}
    >
      {variant === 'myGroups' ? (
        <RectangleGroup isAddGroup={true} title="Crie Seu Grupo" />
      ) : null}
      {variant === 'myGroups'
        ? myGroups.map((grp) => (
            <RectangleGroup
              id={grp.id}
              key={grp.id}
              title={grp.name}
              img={grp.group_image}
              // members={grp.members.length}
              events={1}
            />
          ))
        : groups.map((grp) => (
            <GroupCard
              image={grp.group_image}
              id={grp.id}
              key={grp.id}
              name={grp.name}
              // members={grp.members.length}
              // privacy={grp.group_type}
              onJoin={() => handleJoinGroup(grp.id)}
            />
          ))}
    </ul>
  );
};

export default ListMyGroups;
