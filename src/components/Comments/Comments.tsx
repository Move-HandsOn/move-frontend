import styles from './Comments.module.css';
import CommentsData from '../../mocks/commentsData.json';
import { useState } from 'react';
import Heart from '../../assets/Heart.svg';
import HeartRed from '../../assets/Heart_red.svg';

type Props = {
  id: string;
};

function Comments({id} : Props) {
  const [comments] = useState(CommentsData);
  const [likes, setLikes] = useState(Array(comments.length).fill(false));
  const [idActivity] = useState(id)

  const handleLikeClick = (index: number) => {
    const updatedLikes = [...likes];
    updatedLikes[index] = !updatedLikes[index];
    setLikes(updatedLikes);
  };

  return (
    <div id={idActivity} className={styles.container}>
      <div className={styles.commentsSection}>
        <h2>Comentários</h2>
        {comments.length === 0 ? (
          <p className={styles.noComments}>Não há comentários.</p>
        ) : (
          <>
            <ul className={styles.commentsList}>
              {comments.map((comment, index) => (
                <li key={index} className={styles.comment}>
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className={styles.commentAvatar}
                  />
                  <div className={styles.commentContent}>
                    <span className={styles.commentUser}>
                      {comment.user.name}
                    </span>
                    <p>{comment.text}</p>
                  </div>

                  <img
                    src={likes[index] ? HeartRed : Heart}
                    alt="Botão de Curtir Comentário"
                    className={styles.likeIcon}
                    onClick={() => handleLikeClick(index)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Comments;
