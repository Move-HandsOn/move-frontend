import style from './ButtonWhite.module.css';

type Props = {
  name: string;
};

function ButtonWhite({ name }: Props) {
  return (
    <div>
      <button className={style.btn_white}> {name} </button>
    </div>
  );
}

export default ButtonWhite;
