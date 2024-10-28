import style from '../Groups/Groups.module.css';
import Button from '@/components/Button/Button';
import SearchBar from '@/components/SearchBar/SearchBar';
import ListMyGroups from '@/components/ListMyGroups/ListMyGroups';
import Layout from '@/layout';
import { useState } from 'react';


const Groups = () => {

    const [statusGroup, setStatusGroup] = useState('events')

    const setMyGroups = () => {

        if (!statusGroup) {
            setStatusGroup('myGroups')
        }
    }

    const setOtherGroups = () => {

        if (statusGroup) {
            setStatusGroup('otherGroups')
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
                    <ListMyGroups variant={statusGroup} /> 
                    {/* {
                        statusGroup ? <ListMyGroups variant={statusGroup} /> : <ListOtherGroups />
                    } */}

                </section>
            </Layout>
        </>
    )
}

export default Groups