import style from './modal.module.css';

type ModalRootProps = React.HTMLProps<HTMLDivElement>;

const ModalRoot = ({ children, ...rest}: ModalRootProps) => {
  return (
    <div className={style.modalRoot} {...rest}>
      {children}
    </div>
  );
};

export default ModalRoot;
