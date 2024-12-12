import style from './NavSearchPage.module.css'
import Button from '../Button/Button'
import { useSearchParams } from 'react-router-dom';

const NavSearchPage = () => {
     
    const [searchParams, setSearchParams] = useSearchParams();

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
        setSearchParams(params => Object.fromEntries(
            Object.entries(params).filter(([key]) => !['groups', 'users'].includes(key))
        ));
    };
    
    const onAll = !searchParams.get('users') && !searchParams.get('groups') ? 'blue' : 'gray';
    const onUsers = searchParams.get('users') === 'true' ? 'blue' : 'gray';
    const onGroups = searchParams.get('groups') === 'true' ? 'blue' : 'gray';

    return(
        <nav className={style.nav_search_container}>
            <Button 
                name='Todos'
                variant={onAll}
                radius='lg'
                onClick={changeAll}
            />
            <Button 
                name='Grupos'
                variant={onGroups}
                radius='lg'
                onClick={changeGroups}
            />
            <Button 
                name='Users'
                variant={onUsers}
                radius='lg'
                onClick={changeUsers}
            />
        </nav>
    )
}

export default NavSearchPage