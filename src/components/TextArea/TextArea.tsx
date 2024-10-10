import style from './textArea.module.css';
import React from "react";

type TextAreaProps = React.HTMLProps<HTMLTextAreaElement>;

export function TextArea({...rest}: TextAreaProps) {
    return (
        <textarea 
            className={style.customTextarea} 
            {...rest} 
        />
    );
}
