import { useState, useEffect } from 'react';
import style from './ListMyGroups.module.css';
import RectangleGroup from '../RectangleGroup/RectangleGroup';
import GroupCard from '../GroupCard/GroupCard';
import { myGroupsRequest, allGroupsRequest } from '@/services/requests';
import { Link } from 'react-router-dom';

type ListMyGroupsProps = React.ComponentProps<'ul'> & {
  variant: 'myGroups' | 'otherGroups' | string;
};

interface IGroups {
  created_at: Date;
  description: string;
  group_image: string;
  id: string;
  name: string;
  members?: unknown[];
  group_type?: string;
  isParticipation: boolean;
  variant?: string;
}

const ListMyGroups = ({ variant, ...props }: ListMyGroupsProps) => {
  const [groups, setGroups] = useState<IGroups[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const responseGroups =
        variant === 'myGroups'
          ? await myGroupsRequest()
          : await allGroupsRequest();

      const formattedGroups: IGroups[] = [];

      for (const element of responseGroups) {
        formattedGroups.push({
          ...element,
          created_at: element.created_at ?? new Date(),
          description: element.description ?? '',
          group_image: element.group_image ?? '',
          variant: '',
        });
      }

      setGroups(formattedGroups);
    };
    fetchGroups();
  }, [variant]);

  const handleJoinGroup = (groupId: string) => {
    console.log(`Usuário quer participar do grupo ${groupId}`);
  };

  return (
    <ul
      className={
        variant === 'otherGroups'
          ? style.list_other_groups_container
          : style.list_my_groups_container
      }
      {...props}
    >
      {variant === 'myGroups' ? (
        <Link to={'/new-group'}>
          <RectangleGroup isAddGroup={true} title="Crie Seu Grupo" />
        </Link>
      ) : null}
      {variant === 'myGroups'
        ? groups.map((grp) => (
            <RectangleGroup
              id={grp.id}
              key={grp.id}
              title={grp.name}
              img={grp.group_image}
              members={grp.members ? grp.members.length : 0}
              events={1}
            />
          ))
        : groups.map((grp) => (
            <GroupCard
              group_image={grp.group_image}
              id={grp.id}
              key={grp.id}
              name={grp.name}
              members={grp.members}
              group_type={grp.group_type}
              description={grp.description}
              created_at={grp.created_at}
              isParticipation={grp.isParticipation}
              onJoin={() => handleJoinGroup(grp.id)}
            />
          ))}
    </ul>
  );
};

export default ListMyGroups;
