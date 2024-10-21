import { useState } from 'react';
import groupData from '../../mocks/groupData.json';
import RectangleGroup from '../RectangleGroup/RectangleGroup';

const ListMyGroups = () =>{

    const [group] = useState(groupData)
    const myGroups = group.filter((gpr) => gpr.name.split("").some((letter) => letter.toLocaleLowerCase() === "i"))

    return(
        <ul>
            {
                myGroups.map((grp)=>(
                    <RectangleGroup 
                        id={grp.id}
                        title={grp.name}
                        img={grp.image}
                        members={grp.members}
                        events={1}
                        />
                ))
            }
        </ul>
    )
}

export default ListMyGroups