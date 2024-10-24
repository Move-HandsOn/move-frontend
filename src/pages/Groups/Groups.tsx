import style from '../Groups/Groups.module.css';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import ListMyGroups from '@/components/ListMyGroups/ListMyGroups';
import ListOtherGroups from '@/components/ListOtherGroups/ListOtherGroups';
import Layout from '@/layout';
import { useState } from 'react';


const Groups = () => {

    const [statusGroup, setStatusGroup] = useState(false)

    const setMyGroups = () => {

        if (!statusGroup) {
            setStatusGroup(true)
        }
    }

    const setOtherGroups = () => {

        if (statusGroup) {
            setStatusGroup(false)
        }
    }

    return (
        <>
            <Layout title='Grupos'>
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
                    {
                        statusGroup ? <ListMyGroups /> : <ListOtherGroups />
                    }

                </section>
            </Layout>
        </>
    )
}

export default Groups