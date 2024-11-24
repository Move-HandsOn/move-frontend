import style from './Activity.module.css';
import PostImage from '../PostImage/PostImage';
import InteractionBox from '../InteractionBox/InteractionBox';
import CommentsModal from '../CommentsModal/CommentsModal';

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
  openModal

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
              <PostImage key={id} image={img} />
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
        likes={0}
        likedByCurrentUser={false}
        onOpenComments={onOpenComments}
        onDeletePost={onDeletePost}
        showOptions={showOptions}
      />
    </div>
    <CommentsModal key={id} profileImage={author.image} id={id} open={openModal} onClose={handleCloseModalComments} />
    </>
  );
}

export default Activity;
