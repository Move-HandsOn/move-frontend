import style from './ModalRoot.module.css'; // Ajuste o caminho conforme necessário

type ModalRootProps = React.HTMLProps<HTMLDivElement>;

const ModalRoot = ({ children, ...rest}: ModalRootProps) => {
  return (
    <div className={style.modalRoot} {...rest}>
      {children}
    </div>
  );
};

export default ModalRoot;
