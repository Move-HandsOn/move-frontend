import style from './modal.module.css'; 

type ModalIconProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ModalIcon = ({...rest }: ModalIconProps) => {
  return (<div className={style.modalIcon}>
    <img {...rest}/>
    </div>
  );
};

export default ModalIcon;
