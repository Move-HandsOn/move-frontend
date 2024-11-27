import { allGroupsRequest, myGroupsRequest, requestJoinGroup } from '@/services/requests';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupCard from '../GroupCard/GroupCard';
import RectangleGroup from '../RectangleGroup/RectangleGroup';
import style from './ListMyGroups.module.css';
import { useQuery } from '@tanstack/react-query';
import PlaceHolder from '@/assets/placeholder.png';

type ListMyGroupsProps = React.ComponentProps<'ul'> & {
  variant: 'myGroups' | 'otherGroups' | string;
};

interface IGroup {
  created_at: Date;
  description: string;
  group_image: string;
  id: string;
  name: string;
  members?: unknown[];
  group_type?: string;
  status: string;
  events: unknown[];
}

const ListMyGroups = ({ variant, ...props }: ListMyGroupsProps) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ['groups', variant],
    queryFn: async () => {
      const response =
        variant === 'myGroups'
          ? await myGroupsRequest()
          : await allGroupsRequest();

      const formattedGroups: IGroup[] = response.map((element) => {

        return {
          ...element,
          created_at: element.created_at ?? new Date(),
          description: element.description ?? '',
          group_image: element.group_image ?? '',
          variant: '',
        };
      });
      setGroups(formattedGroups);

      console.log(response);

      return formattedGroups;
    },
    refetchOnMount: true,
  });

  const handleJoinGroup = async (groupId: string) => {
    const response = await requestJoinGroup(groupId);

    setGroups((prevGroups) =>
      prevGroups.map((grp) =>
        grp.id === groupId
          ? {
            ...grp,
            status:
              response.data.message === 'Joined.'
                ? 'participando'
                : response.data.message === 'Join request sent.'
                  ? 'solicitado'
                  : grp.status,
          }
          : grp
      )
    );
    refetch()
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
        <button
          onClick={() => navigate('/new-group')}
          className={style.btn_create_new_group}
        >
          <RectangleGroup isAddGroup={true} title="Crie Seu Grupo" />
        </button>
      ) : null}
      {variant === 'myGroups'
        ? groups.map((grp) => (
          <RectangleGroup
            id={grp.id}
            key={grp.id}
            title={grp.name}
            img={grp.group_image || PlaceHolder}
            members={grp.members ? grp.members.length : 0}
            status={grp.status}
            events={grp.events.length ?? 0}
          />
        ))
        : groups.map((grp) => (
          <GroupCard
            group_image={grp.group_image || PlaceHolder}
            id={grp.id}
            key={grp.id}
            name={grp.name}
            members={grp.members}
            group_type={grp.group_type}
            description={grp.description}
            created_at={grp.created_at}
            status={grp.status}
            onJoin={() => handleJoinGroup(grp.id)}
          />
        ))}
    </ul>
  );
};

export default ListMyGroups;
