import style from './modal.module.css'; 

type ModalSeparatorMediumProps = React.HTMLAttributes<HTMLDivElement>;

const ModalSeparatorMedium = ({...rest }: ModalSeparatorMediumProps) => {
  return <div className={style.modalSeparatorMedium} {...rest} />;
};

export default ModalSeparatorMedium;


