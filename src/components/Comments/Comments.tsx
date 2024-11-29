import { useState } from 'react';
import styles from './Comments.module.css';

export type IComments = {
  id: string;
  activity_id: string;
  post_id: string | null;
  comment_text: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: {
    name: string;
    profile_image: string;
  };
  likes: string[];
};

type Props = {
  id: string;
  listComments?: IComments[];
};

function Comments({ id, listComments }: Props) {
  const [comments] = useState(listComments);

  return (
    <div id={id} className={styles.container}>
      <div className={styles.commentsSection}>
        <h2>Comentários</h2>
        {comments?.length === 0 ? (
          <p className={styles.noComments}>Não há comentários.</p>
        ) : (
          <>
            <ul className={styles.commentsList}>
              {comments?.map((comment, index) => (
                <li key={index} className={styles.comment}>
                  <img
                    src={
                      comment.user?.profile_image ||
                      'https://via.placeholder.com/150'
                    }
                    alt={comment.user?.name || 'Anonymous'}
                    className={styles.commentAvatar}
                  />
                  <div className={styles.commentContent}>
                    <span className={styles.commentUser}>
                      {comment.user?.name || 'Anonymous'}
                    </span>
                    <p>{comment.comment_text}</p>
                    <span className={styles.commentDate}>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
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
