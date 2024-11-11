import style from './RectangleGroup.module.css'
import ThreePerson from '../../assets/UsersThree.svg'
import ThreePoints from '../../assets/DotsThree.svg'

type RectangleGroupProps = {
    id?: string;
    title: string;
    img?: string;
    members?: number;
    events?: number;
    isAddGroup?: boolean;
}

const RectangleGroup = ({ 
    id, 
    title, 
    img, 
    members, 
    events, 
    isAddGroup = false 
}: RectangleGroupProps) => {

    if (isAddGroup) {
        return (
            <li key={0} className={style.rectangle_group_container_add_group}>
                <div className={style.rectangle_group_container_add_group_icon}>
                    +
                </div>
                <div className={style.rectangle_group_title_add_group}>
                    <h3>{title}</h3>
                </div>
            </li>
        );
    }

    return (
        <li key={id} className={style.rectangle_group_container}>
            <div className={style.rectangle_group_img_container}>
                {img && <img src={img} alt={title} />}
            </div>
            <div className={style.rectangle_group_text_container}>
                <div className={style.rectangle_group_title_container}>
                    <h3>{title}</h3>
                    <span>
                        <img src={ThreePoints} alt='mais opções' />
                    </span>
                </div>
                <div className={style.rectangle_group_infos_container}>
                    <div className={style.rectangle_group_infos_members_container}>
                        <img src={ThreePerson} alt='membros' />
                        <p>{`${members} Membros`}</p>
                    </div>
                    <div className={style.rectangle_group_infos_events_container}>
                        <p className={style.rectangle_group_infos_events_bulletpoint_container}>&bull;</p>
                        <p>{`${events} Eventos`}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default RectangleGroup;
