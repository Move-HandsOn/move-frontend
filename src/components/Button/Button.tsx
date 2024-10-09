import styles from './Button.module.css';

type Props = {
  name: string;
  variant: 'standard' | 'white' | 'gray';
};

function Button({ name, variant }: Props) {
  const className =
    variant === 'standard'
      ? styles.btn_std
      : variant === 'white'
        ? styles.btn_white
        : styles.btn_gray;

  return <button className={className}>{name} </button>;
}

export default Button;
