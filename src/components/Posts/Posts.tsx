import style from './Posts.module.css';
import PostImage from '../PostImage/PostImage';
import InteractionBox from '../InteractionBox/InteractionBox';

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
  activityImage?: string[] | null;
  onOpenComments: () => void;
  isUserView: boolean;
};

function Posts({
  postDate,
  author,
  content,
  commentsCount,
  likes,
  likedByCurrentUser,
  activityImage,
  onOpenComments,
  isUserView,
}: Props) {
  return (
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
      <span className={style.date}>{postDate}</span>

      <InteractionBox
        id={0}
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
      />
    </div>
  );
}

export default Posts;
