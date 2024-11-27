import style from './RequestGroupCard.module.css';
import check from '../../assets/Check.svg';
import xCircle from '../../assets/XCircle.png';

type RequestGroupCardProps = {
  id: number;
  name: string;
  image: string;
};

const RequestGroupCard = ({ id, name, image }: RequestGroupCardProps) => {
  return (
    <li key={id} className={style.card_request}>
      <div className={style.card_request_people}>
        <img src={image} alt={name} />
        <p>{name}</p>
      </div>
      <div className={style.card_request_check}>
        <img src={check} alt="check" />
        <img src={xCircle} alt="reject" />
      </div>
    </li>
  );
};

export default RequestGroupCard;
