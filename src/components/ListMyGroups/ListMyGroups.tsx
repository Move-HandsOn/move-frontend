import { useState } from 'react';
import style from './ListMyGroups.module.css';
import groupData from '../../mocks/groupData.json';
import eventsData from '../../mocks/eventsData.json';
import RectangleGroup from '../RectangleGroup/RectangleGroup';
import GroupCard from '../GroupCard/GroupCard';
import EventGroupCard from '../EventGroupCard/EventGroupCard';

type ListMyGroupsProps = React.ComponentProps<"ul"> & {
    variant: 'myGroups' | 'otherGroups' | 'events' | string,
    // children?: React.ReactNode
} 

const ListMyGroups = ({variant, ...props}: ListMyGroupsProps) =>{

    const [group] = useState(groupData)
    const [event] = useState(eventsData)
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
                : variant === "otherGroups" ?
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
                :
                event.map((ev) => (
                    <EventGroupCard 
                        name={ev.name}
                        description={ev.description}
                        address={ev.address}
                        date={ev.date}
                        endHour={ev.endHour}
                        initHour={ev.initHour}
                        id={ev.id}

                    />
                ))
            }
        </ul>
    )
}

export default ListMyGroups