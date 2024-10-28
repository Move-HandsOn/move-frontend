import { useState } from 'react';
import style from './ListMyGroups.module.css';
import groupData from '../../mocks/groupData.json';
import RectangleGroup from '../RectangleGroup/RectangleGroup';
import GroupCard from '../GroupCard/GroupCard';

type ListMyGroupsProps = React.ComponentProps<"ul"> & {
    variant: 'myGroups' | 'otherGroups' | string,
    // children?: React.ReactNode
} 

const ListMyGroups = ({variant, ...props}: ListMyGroupsProps) =>{

    const [group] = useState(groupData)
    const myGroups = group.filter((gpr) => gpr.name.split("").some((letter) => letter.toLocaleLowerCase() === "i"))

    const handleJoinGroup = (groupId: number) => {
        console.log(`Usuário quer participar do grupo ${groupId}`);
      };

    return(
        <ul className={variant === 'myGroups' ? style.list_my_groups_container : style.list_other_groups_container} {...props}>
            {
                variant === 'myGroups' ?
                myGroups.map((grp)=>(
                    <RectangleGroup 
                        id={grp.id}
                        title={grp.name}
                        img={grp.image}
                        members={grp.members}
                        events={1}
                        />
                ))
                :
                group.map((grp)=>(
                    <GroupCard
                        image={grp.image}
                        id={grp.id}
                        name={grp.name}
                        members={grp.members}
                        privacy={grp.privacy}
                        onJoin={() => handleJoinGroup(grp.id)}
                        />
                ))

            }
        </ul>
    )
}

export default ListMyGroups