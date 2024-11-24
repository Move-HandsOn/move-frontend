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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request = {
      activity_id: id,
      comment_text: comment
    }
    console.log("Comentário enviado:", request);
    setComment("");
  };

  return (
    <form className={style.input_container} onSubmit={handleSubmit}>

      <img src={profileImage} alt='user image' className={style.input_container_img_profile} />
      <input
        type="text"
        value={comment} 
        onChange={handleInputChange}
        placeholder="Escreva uma mensagem"
      />
      <Button name="" variant="standard"> 
        <img src={icon} alt="submit message" />
      </Button>
    </form>
  );
}
