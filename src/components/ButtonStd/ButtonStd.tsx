import styles from './ButtonStd.module.css';

type Props = {
  name: string;
};

function ButtonStd({ name }: Props) {
  return <button className={styles.btn_std}>{name} </button>;
}

export default ButtonStd;
