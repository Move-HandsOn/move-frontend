import groupData from '../../mocks/groupData.json';
import style from '../Groups/Groups.module.css';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import RectangleGroup from '@/components/RectangleGroup/RectangleGroup';


const Groups = () =>{
    // const jsonList = groupData
    // const list = JSON.parse(jsonList)
    // const listTemp: TempListData =  list

    const listTemp =  groupData;
    const obj = listTemp[0]

    return(
        <section className={style.feed_container}>
            <div className={style.button_container}>
                <Button
                    name="Meus Grupos"
                    variant="standard"
                />
                <Button
                    name="Outros Grupos"
                    variant="gray"
                />
            </div>
            <div className={style.nav_container}>
                <SearchBar />
            </div>

            <RectangleGroup 
            id={obj.id}
            title={obj.name}
            img={obj.image}
            members={obj.members}
            events={1}
            />

        </section>
    )
}

export default Groups