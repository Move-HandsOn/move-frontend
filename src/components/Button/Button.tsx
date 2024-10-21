import styles from './Button.module.css';

type Props = {
  name: string;
  variant: 'standard' | 'white' | 'gray';
  onClick?: (e:  React.MouseEvent<HTMLButtonElement>)=> void;
};

function Button({ name, variant, onClick }: Props) {
  const variants = {
    standard: "btn_std",
    white: "btn_white",
    gray: "btn_gray" 
  }
  const className = styles[variants[variant]]
  
  return <button className={className} onClick={onClick}>{name} </button>;
}

export default Button;
