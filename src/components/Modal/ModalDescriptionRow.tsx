import style from './modal.module.css'; 

type ModalDescriptionRowProps = React.HTMLProps<HTMLHeadingElement>;

const ModalDescriptionRow = ({ children, ...rest }: ModalDescriptionRowProps) => {
  return (<div className={style.modalDescriptionRow} {...rest}>
      {children}
    </div>
  );
};

export default ModalDescriptionRow;
