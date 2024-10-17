import style from './ModalClose.module.css';
import closeImg from '../../assets/X.svg'

type ModalCloseProps = React.HTMLProps<HTMLDivElement>;

const ModalClose = ({...rest}: ModalCloseProps) => {
  return (
    <div className={style.modalClose} {...rest}>
      <img src={closeImg} alt=""/>
    </div>
  );
};

export default ModalClose;
