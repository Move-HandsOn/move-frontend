import style from "./GroupMenu.module.css";
import Button from "../Button/Button";

type GroupMenuProps = {
    isAdm: boolean,
    setPosts: (event: React.MouseEvent<HTMLButtonElement>) => void,
    setRequests: (event: React.MouseEvent<HTMLButtonElement>) => void,
    setEvents: (event: React.MouseEvent<HTMLButtonElement>) => void,
    statusGroup: string
}

const GroupMenu = ({ isAdm, setPosts, setRequests, setEvents, statusGroup }: GroupMenuProps) => {

    return (
        <>
            {
                isAdm ?
                    <nav className={style.nav_adm_container}>
                        <Button
                            name="Postagens"
                            variant={statusGroup === "posts" ? "standard" : "gray"}
                            onClick={setPosts}
                        />
                        <Button
                            name="Solicitações"
                            variant={statusGroup === "requests" ? "standard" : "gray"}
                            onClick={setRequests}
                        />
                        <Button
                            name="Eventos"
                            variant={statusGroup === "events" ? "standard" : "gray"}
                            onClick={setEvents}
                        />
                    </nav>
                    :
                    <nav className={style.nav_container}>
                        <Button
                            name="postagens"
                            variant={statusGroup === "posts" ? "standard" : "gray"}
                            onClick={setPosts}
                        />
                        <Button
                            name="eventos"
                            variant={statusGroup === "events" ? "standard" : "gray"}
                            onClick={setEvents}
                        />
                    </nav>


            }
        </>
    )
}

export default GroupMenu