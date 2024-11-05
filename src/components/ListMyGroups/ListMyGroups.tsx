import { useState, useEffect } from 'react';
import style from './ListMyGroups.module.css';
// import groupData from '../../mocks/groupData.json';
import RectangleGroup from '../RectangleGroup/RectangleGroup';
import GroupCard from '../GroupCard/GroupCard';

type ListMyGroupsProps = React.ComponentProps<"ul"> & {
    variant: 'myGroups' | 'otherGroups' | string
} 

type GroupProps = {
    id: number;
    group_image: string;
    name: string;
    members: [];
    group_type: string;
    onJoin: () => void;
    isJoined?: boolean;
    isParticipation?: boolean;
  };

const ListMyGroups = ({variant, ...props}: ListMyGroupsProps) =>{

    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<GroupProps[]>([]);
    const myGroups = groups.filter((gpr) => gpr.name.split("").some((letter) => letter.toLocaleLowerCase() === "i"))
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmRvQG1vdmUuY29tIiwic3ViIjoiMzI2NzUwYjUtNTgzYS00NjhmLTg3ZDktOTg5NGRkOTY1NWIyIiwiaWF0IjoxNzMwODI4NzM2LCJleHAiOjE3Mzg2MDQ3MzZ9.C6A8QB5b-Q5Lfvdbck745YUc0fwbW8xvzheFt_R72Uc";


    useEffect(() => {
        const fetchGroups = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://move-backend-yuih.onrender.com/groups', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao buscar grupos');
                }
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGroups();
    }, []);

    console.log(groups)

    const handleJoinGroup = (groupId: number) => {
        console.log(`Usuário quer participar do grupo ${groupId}`);
      };

    return(
        <ul className={variant === 'myGroups' ? style.list_my_groups_container : style.list_other_groups_container} {...props}>
            {variant === 'myGroups'?
                <RectangleGroup
                    isAddGroup={true}
                    title='Crie Seu Grupo'
                   />
                    : null
            }
            {
                variant === 'myGroups' ?
                myGroups.map((grp)=>(
                    <RectangleGroup 
                        id={grp.id}
                        key={grp.id}
                        title={grp.name}
                        img={grp.group_image}
                        members={grp.members.length}
                        events={1}
                        />
                ))
                :
                groups.map((grp)=>(
                    <GroupCard
                        image={grp.group_image}
                        id={grp.id}
                        key={grp.id}
                        name={grp.name}
                        members={grp.members.length}
                        privacy={grp.group_type}
                        onJoin={() => handleJoinGroup(grp.id)}
                        />
                ))

            }
        </ul>
    )
}

export default ListMyGroups