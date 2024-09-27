import style from './InputStd.module.css';

type Props = {
  placeholder: string;
};

function InputStd({ placeholder }: Props) {
  return (
    <input
      className={style.input_std}
      type="text"
      placeholder={placeholder}
    ></input>
  );
}

export default InputStd;
