import { useState } from 'react';
import groupData from '../../mocks/groupData.json';
import GroupCard from '../GroupCard/GroupCard';

const ListOtherGroups = () =>{

    const [group] = useState(groupData)

    const handleJoinGroup = (groupId: number) => {
        console.log(`Usuário quer participar do grupo ${groupId}`);
      };

    return(
        <ul>
            {
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

export default ListOtherGroups