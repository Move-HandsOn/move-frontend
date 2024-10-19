import style from './Groups.module.css';
import groupData from '../../mocks/groupData.json';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';

const Groups = () =>{

    return(
        <section>
            <h1>Grupos</h1>
            <div>
                <Button
                    name="Meus Grupos"
                    variant="standard"
                />
                <Button
                    name="Outros Grupos"
                    variant="gray"
                />
            </div>
            <div>
                <SearchBar />
            </div>

        </section>
    )
}

export default Groups