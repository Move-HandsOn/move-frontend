import { ActivityType, Feed, postNewComment } from '@/services/requests';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import icon from '../../assets/PaperPlaneTiltWhite.svg';
import Button from '../Button/Button';
import style from './NewComment.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

type Props = {
  id: string;
  profileImage?: string;
  name?: string;
  comments?: unknown[];
};

export default function NewComment({ profileImage, comments }: Props) {
  const [searchParams] = useSearchParams();
  const [comment, setComment] = useState('');
  const activityId = searchParams.get('activityId') ?? '';
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
      return handleSubmit(activityId, comment);
    },
    onSuccess: (newComment) => {
      queryClient.setQueryData(['feed'], (oldData: Feed | undefined) => {
        return {
          ...oldData,
          activities: oldData?.activities.map((activity: ActivityType) => {
            if (activity.id === activityId) {
              comments?.push(newComment);
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
