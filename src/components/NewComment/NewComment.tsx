import style from './NewComment.module.css';
import AvatarNatalia from '../../assets/avatar_nataliaOliveira.png';
import PaperPlaneWhite from '../../assets/PaperPlaneTiltWhite.svg';

function NewComment() {
  return (
    <div className={style.container}>
      <div className={style.images}>
        <img className={style.avatar} src={AvatarNatalia} alt="" />
        <div className={style.paperPlaneContainer}>
          <img className={style.paperPlaneWhite} src={PaperPlaneWhite} alt="" />
        </div>
      </div>
    </div>
  );
}

export default NewComment;
