import style from './modal.module.css'; 

type ModalTitleProps = React.HTMLProps<HTMLHeadingElement>;

const ModalTitle = ({ children, ...rest }: ModalTitleProps) => {
  return (<div className={style.modalTitle}>
    <h1 {...rest}>
      {children}
    </h1>
    </div>
  );
};

export default ModalTitle;
