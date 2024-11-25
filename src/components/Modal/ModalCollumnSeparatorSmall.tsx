import style from './modal.module.css'; 

type ModalCollumnSeparatorSmallProps = React.HTMLAttributes<HTMLDivElement>;

const ModalCollumnSeparatorSmall = ({...rest }: ModalCollumnSeparatorSmallProps) => {
  return <div className={style.modalCollumnSeparatorSmall} {...rest} />;
};

export default ModalCollumnSeparatorSmall;


