import React, { useState } from "react";
import Button from "../Button/Button";
import style from "./NewComment.module.css"
import icon from "../../assets/PaperPlaneTiltWhite.svg"

type Props = {
  id: string;
  profileImage?: string;
};

export default function NewComment({ id, profileImage }: Props) {
  const [comment, setComment] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Comentário enviado:", comment);
    setComment("");
  };

  return (
    <div className={style.input_container}>

      <img src={profileImage} alt='user image' className={style.input_container_img_profile} />
      <input
        type="text"
        value={comment} 
        onChange={handleInputChange}
        placeholder="Escreva uma mensagem"
      />
      <Button name="" variant="standard" onClick={handleSubmit}> 
        <img src={icon} alt="submit message" />
      </Button>
    </div>
  );
}
