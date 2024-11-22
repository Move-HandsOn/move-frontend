import style from './modal.module.css';

type ModalFlexColProps = React.HTMLProps<HTMLDivElement>;

const ModalFlexCol = ({ children, ...rest}: ModalFlexColProps) => {
  return (
    <div className={style.modalFlexCol} {...rest}>
      {children}
    </div>
  );
};

export default ModalFlexCol;
