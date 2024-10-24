import styles from './Button.module.css';

type Props = {
  name: string;
  variant: 'standard' | 'white' | 'gray';
  symbol?: boolean
};

function Button({ name, variant, symbol }: Props) {
  const className =
    variant === 'standard'
      ? styles.btn_std
      : variant === 'white'
        ? styles.btn_white
        : styles.btn_gray;

        return (
          <button className={className}>
            {symbol ? <>&#10004;</> : null} {name}
          </button>
        );
}

export default Button;
