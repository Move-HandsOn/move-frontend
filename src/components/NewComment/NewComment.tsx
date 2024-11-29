import { postNewComment } from '@/services/requests';
import { ActivityType, Feed } from '@/services/requestTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import icon from '../../assets/PaperPlaneTiltWhite.svg';
import Button from '../Button/Button';
import Loading from '../Loading/Loading';
import style from './NewComment.module.css';

type Props = {
  id: string;
  profileImage?: string;
  name?: string;
};

export default function NewComment({ id, profileImage }: Props) {
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (activityId: string, commentText: string) => {
    const newComment = await postNewComment(activityId, commentText);
    return newComment;
  };

  const { mutateAsync: createCommentFn } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      return handleSubmit(id, comment);
    },
    onSuccess: (newComment) => {
      queryClient.setQueryData(['feed'], (oldData: Feed | undefined) => {
        return {
          ...oldData,
          activities: oldData?.activities.map((activity: ActivityType) => {
            if (activity.id === id) {
              return {
                ...activity,
                comments: [...activity.comments, newComment],
              };
            }
            return activity;
          }),
        };
      });
      setLoading(false);
      setComment('');
    },
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createCommentFn();
  };

  return (
    <form className={style.input_container} onSubmit={handleFormSubmit}>
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
      <Loading show={loading} />
    </form>
  );
}
