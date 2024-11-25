import style from './modal.module.css'; 

type ModalSeparatorLargeProps = React.HTMLAttributes<HTMLDivElement>;

const ModalSeparatorLarge = ({...rest }: ModalSeparatorLargeProps) => {
  return <div className={style.modalSeparatorLarge} {...rest} />;
};

export default ModalSeparatorLarge;


