import style from './Activity.module.css';
import PostImage from '../PostImage/PostImage';
import InteractionBox from '../InteractionBox/InteractionBox';
import CommentsModal from '../CommentsModal/CommentsModal';

type IComments = {
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
  author: {
    name?: string;
    image?: string;
  };
  content: string;
  postDate: string;
  commentsCount: number;
  likes: number;
  activityImage?: string[] | null;
  onOpenComments: () => void;
  handleCloseModalComments: () => void;
  openModal: boolean;
  isUserView: boolean;
  onDeletePost: (id: string) => void;
  showOptions: boolean;
  categoryName: string;
  duration: string;
  listComments: IComments[]
  isCurrentLike?: boolean
};

function Activity({
  id,
  postDate,
  author,
  content,
  commentsCount,
  activityImage,
  onOpenComments,
  handleCloseModalComments,
  isUserView,
  onDeletePost,
  showOptions,
  categoryName,
  duration,
  openModal,
  listComments,
  likes,
  isCurrentLike
}: Props) {
  return (
    <>
    <div className={style.post}>
      <div className={style.header}>
        <img src={author.image} alt={author.name} className={style.avatar} />
        <span className={style.authorName}>{author.name}</span>
      </div>

      <p className={style.content}>{content}</p>

      {isUserView && activityImage && (
        <div className={style.imageCarousel}>
          {activityImage.map((img, index) => (
            <div className={style.cardWrapper}>
              <PostImage key={index} image={img} />
            </div>
          ))}
        </div>
      )}
      <div className={style.activityBox}>
        <div className={style.activityName}>
          <span>Atividade</span>
          <p>{categoryName} </p>
        </div>
        <div className={style.activityDuration}>
          <span>Tempo</span>
          <p>{duration} </p>
        </div>
      </div>
      <span className={style.date}>{postDate}</span>

      <InteractionBox
        id={id}
        author={{
          name: '',
          image: '',
        }}
        content={''}
        postDate={''}
        commentsCount={commentsCount}
        likes={likes}
        likedByCurrentUser={isCurrentLike ?? false}
        onOpenComments={onOpenComments}
        onDeletePost={onDeletePost}
        showOptions={showOptions}
      />
    </div>
    <CommentsModal listComments={listComments} key={id} profileImage={author.image} id={id} open={openModal} onClose={handleCloseModalComments} />
    </>
  );
}

export default Activity;
