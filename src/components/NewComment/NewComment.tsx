import { postNewComment } from '@/services/requests';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import icon from '../../assets/PaperPlaneTiltWhite.svg';
import Button from '../Button/Button';
import style from './NewComment.module.css';

type Props = {
  id: string;
  profileImage?: string;
};

export default function NewComment({ id, profileImage }: Props) {
  const [searchParams] = useSearchParams();
  const [comment, setComment] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const activityId = searchParams.get('activityId') ?? '';
    await postNewComment(activityId, comment);

    setComment('');
  };

  return (
    <form className={style.input_container} onSubmit={handleSubmit}>
      <img
        src={profileImage}
        alt="user image"
        className={style.input_container_img_profile}
      />
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
