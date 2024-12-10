import PlaceHolder from '@/assets/placeholder.png';
import { allGroupsRequest, myGroupsRequest } from '@/services/requests';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupCard from '../GroupCard/GroupCard';
import RectangleGroup from '../RectangleGroup/RectangleGroup';
import style from './ListMyGroups.module.css';
import Loading from '../../components/Loading/Loading';

type ListMyGroupsProps = React.ComponentProps<'ul'> & {
  variant: 'myGroups' | 'otherGroups' | string;
  filteredItemValue: string;
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

const ListMyGroups = ({
  variant,
  filteredItemValue,
  ...props
}: ListMyGroupsProps) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function getGroupData(): IGroup[] {
    return filteredItemValue
      ? groups.filter((g) =>
          g.name.toLowerCase().includes(filteredItemValue.toLowerCase())
        )
      : groups;
  }

  useQuery({
    queryKey: ['groups', variant],
    queryFn: async () => {
      setLoading(true);
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
      setLoading(false);
      return formattedGroups;
    },
    refetchOnMount: true,
  });

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
          <RectangleGroup
            id="myGroups"
            isAddGroup={true}
            title="Crie seu grupo"
          />
        </button>
      ) : null}
      {variant === 'myGroups'
        ? getGroupData().map((grp) => (
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
        : getGroupData().map((grp) => (
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
            />
          ))}
      <Loading show={loading} />
    </ul>
  );
};

export default ListMyGroups;
