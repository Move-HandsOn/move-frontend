import style from './Posts.module.css';
import PostImage from '@/components/PostImage/PostImage';
import InteractionBox from '@/components/InteractionBox/InteractionBox';

type Props = {
  id: string;
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
  onDeletePost?: (id: number) => void;
  showOptions: boolean;
};

function Posts({
  id,
  postDate,
  author,
  content,
  commentsCount,
  activityImage,
  onOpenComments,
  isUserView,
  onDeletePost,
  showOptions,
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
  );
}

export default Posts;
