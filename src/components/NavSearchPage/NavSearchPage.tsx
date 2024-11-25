import style from './NavSearchPage.module.css'
import Button from '../Button/Button'

type NavSearchPageProps = {
    setStatusGroup: () => void,
    setStatusUsers: () => void,
    setStatusAll: () => void,
}

const NavSearchPage = ({setStatusGroup, setStatusAll, setStatusUsers}: NavSearchPageProps) => {

    return(
        <nav className={style.nav_search_container}>
            <Button 
                name='Todos'
                variant='gray'
                onClick={setStatusAll}
            />
            <Button 
                name='Grupos'
                variant='gray'
                onClick={setStatusGroup}
            />
            <Button 
                name='Users'
                variant='gray'
                onClick={setStatusUsers}
            />
        </nav>
    )
}

export default NavSearchPage