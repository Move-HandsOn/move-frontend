import style from './modal.module.css';

type ModalFlexRowProps = React.HTMLProps<HTMLDivElement>;

const ModalFlexRow = ({ children, ...rest}: ModalFlexRowProps) => {
  return (
    <div className={style.modalFlexRow} {...rest}>
      {children}
    </div>
  );
};

export default ModalFlexRow;
