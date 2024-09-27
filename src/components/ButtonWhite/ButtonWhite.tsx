import style from './ButtonWhite.module.css';

type Props = {
  name: string;
};

function ButtonWhite({ name }: Props) {
  return <button className={style.btn_white}> {name} </button>;
}

export default ButtonWhite;
