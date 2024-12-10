import style from './textArea.module.css';
import React, { forwardRef } from 'react';

type TextAreaProps = React.HTMLProps<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ ...rest }, ref) {
    return <textarea ref={ref} className={style.customTextarea} {...rest} />;
  }
);
