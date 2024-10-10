import styles from './Button.module.css';

type Props = {
  name: string;
  variant: 'standard' | 'white' | 'gray';
};

function Button({ name, variant }: Props) {
  const variants = {
    standard: "btn_std",
    white: "btn_white",
    gray: "btn_gray" 
  }
  const className = styles[variants[variant]]
  
  return <button className={className}>{name} </button>;
}

export default Button;
