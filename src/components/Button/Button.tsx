import clsx from 'clsx';
import styles from './Button.module.css';
import React from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  variant: 'standard' | 'white' | 'gray';
  radius?: 'lg' | 'sm';
};

function Button({ name, variant = 'standard', radius = 'sm', children, ...rest }: Props) {
  const variants = {
    standard: "btn_std",
    white: "btn_white",
    gray: "btn_gray" 
  }
  const radiusVariants = {
    sm: "radius_sm",
    lg: "radius_lg"
  }
  const className = styles[variants[variant]]
  const classNameBorder = styles[radiusVariants[radius]];
  
  return <button className={clsx(styles.button, className, classNameBorder)} {...rest}>{name}{children}</button>;
}

export default Button;
