import style from '../Groups/Groups.module.css';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import ListMyGroups from '@/components/ListMyGroups/ListMyGroups';


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
            </div>
            <div className={style.nav_container}>
                <SearchBar />
            </div>
            <ListMyGroups />

        </section>
    )
}

export default Groups