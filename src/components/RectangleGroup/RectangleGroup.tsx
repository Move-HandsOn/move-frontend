import style from './RectangleGroup.module.css';
import ThreePerson from '../../assets/UsersThree.svg';
import ThreePoints from '../../assets/DotsThree.svg';
import Button from '../Button/Button';
import check from '../../assets/Check.svg';
import addUser from '../../assets/Vector.png';
import PlaceHolder from '@/assets/placeholder.png';

type RectangleGroupProps = {
  id?: string;
  title?: string;
  img?: string;
  members?: number;
  events?: number;
  status?: string;
  isAddGroup?: boolean;
  isUser?: boolean;
  isSearch?: boolean;
};

const RectangleGroup = ({
  id,
  title,
  img,
  members,
  events,
  isAddGroup = false,
  isUser = false,
  isSearch = false,
  status
}: RectangleGroupProps) => {

  if (isAddGroup) {
    return (
      <div key={0} className={style.rectangle_group_container_add_group}>
        <div className={style.rectangle_group_container_add_group_icon}>+</div>
        <div className={style.rectangle_group_title_add_group}>
          <h3>{title}</h3>
        </div>
      </div>
    );
  }

  return (
    <li
      key={id}
      className={
        isSearch
          ? style.rectangle_search_container
          : style.rectangle_group_container
      }
    >
      <div
        className={
          isSearch
            ? style.rectangle_search_img_container
            : style.rectangle_group_img_container
        }
      >
        {img && <img src={PlaceHolder} alt={title} />}
      </div>
      <div
        className={
          isSearch
            ? style.rectangle_search_text_container
            : style.rectangle_group_text_container
        }
      >
        <div
          className={
            isSearch
              ? style.rectangle_search_title_container
              : style.rectangle_group_title_container
          }
        >
          <h3>{title}</h3>
          <span hidden={isSearch}>
            <img src={ThreePoints} alt="mais opções" />
          </span>
        </div>
        {isUser ? (
          <Button
            name="Seguir"
            variant="white"
            id={style.search_user_btn}
            hidden={!isSearch}
          >
            <img src={addUser} alt="addUser" />
          </Button>
        ) : (
          <div className={style.joinButton_joined}>
            <img src={check} alt="" />
            <p>{status === 'joined' ? 'Participando' : 'Solicitado'}</p>
          </div>
        )
        }

        <div
          className={
            isSearch
              ? style.rectangle_search_infos_container
              : style.rectangle_group_infos_container
          }
          hidden={isSearch}
        >
          <div
            className={style.rectangle_group_infos_members_container}
            hidden={isSearch}
          >
            <img src={ThreePerson} alt="membros" hidden={isSearch} />
            <p hidden={isSearch}>{`${members} Membros`}</p>
          </div>
          <div
            className={
              isSearch
                ? style.rectangle_search_infos_events_container
                : style.rectangle_group_infos_events_container
            }
            hidden={isSearch}
          >
            <p
              className={
                style.rectangle_group_infos_events_bulletpoint_container
              }
              hidden={isSearch}
            >
              &bull;
            </p>
            <p hidden={isSearch}>{`${events} Eventos`}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RectangleGroup;
