import style from './modal.module.css'; 

type ModalSeparatorSmallProps = React.HTMLAttributes<HTMLDivElement>;

const ModalSeparatorSmall = ({...rest }: ModalSeparatorSmallProps) => {
  return <div className={style.modalSeparatorSmall} {...rest} />;
};

export default ModalSeparatorSmall;


