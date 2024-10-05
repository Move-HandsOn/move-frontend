import styles from './Button.module.css';

type Props = {
  name: string;
  variant: 'standard' | 'white';
};

function Button({ name, variant }: Props) {
  const className = variant === 'standard' ? styles.btn_std : styles.btn_white;
  return <button className={className}>{name} </button>;
}

export default Button;
