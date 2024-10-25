import style from "./GroupMenu.module.css";
import Button from "../Button/Button";

type GroupMenuProps = {
    isAdm: boolean
}

const GroupMenu = ({ isAdm }: GroupMenuProps) => {

    return (
        <>
            {
                isAdm ?
                    <nav className={style.nav_adm_container}>
                        <Button
                            name="Postagens"
                            variant="gray"
                        />
                        <Button
                            name="Solicitações"
                            variant="standard"
                        />
                        <Button
                            name="Eventos"
                            variant="gray"
                        />
                    </nav>
                    :
                    <nav className={style.nav_container}>
                        <Button
                            name="postagens"
                            variant="standard"
                        />
                        <Button
                            name="eventos"
                            variant="gray"
                        />
                    </nav>


            }
        </>
    )
}

export default GroupMenu