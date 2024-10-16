import style from './Posts.module.css';
import Heart from '../../assets/Heart.svg';
import HeartRed from '../../assets/Heart_red.svg';
import ChatText from '../../assets/ChatText.svg';
import PaperPlane from '../../assets/PaperPlaneTilt.svg';
import { useState } from 'react';

type Props = {
  id: number;
  author: {
    name: string;
    image: string;
  };
  content: string;
  postDate: string;
  commentsCount: number;
  likes: number;
  likedByCurrentUser: boolean;
  onOpenComments: () => void;
};

function Posts({
  postDate,
  author,
  content,
  commentsCount,
  likes,
  likedByCurrentUser,
  onOpenComments,
}: Props) {
  const [isLiked, setIsLiked] = useState(likedByCurrentUser);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);

    if (isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  return (
    <div className={style.post}>
      <div className={style.header}>
        <img src={author.image} alt={author.name} className={style.avatar} />
        <span className={style.authorName}>{author.name}</span>
      </div>

      <p className={style.content}>{content}</p>
      <span className={style.date}>{postDate}</span>

      <div className={style.actions}>
        <span>
          <span onClick={handleLikeClick} className={style.actionIcon}>
            {isLiked ? <img src={HeartRed} /> : <img src={Heart} />}
            <p>Curtir</p>
          </span>
        </span>

        <span className={style.actionIcon} onClick={onOpenComments}>
          <img src={ChatText} />
          <p>Comentar</p>
          <aside>{commentsCount}</aside>
        </span>

        <span className={style.actionIcon}>
          <img src={PaperPlane} />
          <p>Compartilhar</p>
        </span>
      </div>
    </div>
  );
}

export default Posts;
