import style from './ModalRoot.module.css'; // Ajuste o caminho conforme necessário

type ModalTitleProps = React.HTMLProps<HTMLParagraphElement>

const ModalTitle = ({ children, ...rest}: ModalTitleProps) => {
  return (
    <div className={style.modalTitle} {...rest}>
      {children}
    </div>
  );
};

export default ModalTitle;
