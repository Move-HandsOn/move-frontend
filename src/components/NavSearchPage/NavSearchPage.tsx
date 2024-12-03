import style from './NavSearchPage.module.css'
import Button from '../Button/Button'
import { useSearchParams } from 'react-router-dom';

const NavSearchPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSearchParams] = useSearchParams();

    const changeUsers = () => {
        setSearchParams(params => {
            params.set('users', 'true');
            params.set('groups', 'false');
            return params
        })
    };

    const changeGroups = () => {
        setSearchParams(params => {
            params.set('groups', 'true');
            params.set('users', 'false');
            return params
        })
    };

    const changeAll = () => {
        setSearchParams(params => {
            params.delete('groups', 'true');
            params.delete('users', 'true');
            return params
        })
    };

    return(
        <nav className={style.nav_search_container}>
            <Button 
                name='Todos'
                variant='gray'
                onClick={changeAll}
            />
            <Button 
                name='Grupos'
                variant='gray'
                onClick={changeGroups}
            />
            <Button 
                name='Users'
                variant='gray'
                onClick={changeUsers}
            />
        </nav>
    )
}

export default NavSearchPage