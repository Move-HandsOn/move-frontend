// import groupData from '../../mocks/groupData.json';
import style from '../Groups/Groups.module.css';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';

const Groups = () =>{

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
                 <Button
                    name="Outros Grupos"
                    variant="white"
                />
            </div>
            <div className={style.nav_container}>
                <SearchBar />
            </div>

        </section>
    )
}

export default Groups