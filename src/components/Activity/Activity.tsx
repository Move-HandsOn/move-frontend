import { Feed } from '@/services/requestTypes';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import CommentsModal from '../CommentsModal/CommentsModal';
import InteractionBox from '../InteractionBox/InteractionBox';
import PostImage from '../PostImage/PostImage';
import style from './Activity.module.css';

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
  description: string;
  postDate: string;
  commentsCount: number;
  likes: number;
  activityImages?: string[] | null;
  onOpenComments: () => void;
  handleCloseModalComments: () => void;
  openModal: boolean;
  isUserView: boolean;
  onDeletePost?: (id: string) => void;
  showOptions?: boolean;
  categoryName: string;
  duration: string;
  comments?: IComments[];
  isCurrentLike?: boolean;
};

function Activity({
  id,
  postDate,
  author,
  description,
  commentsCount,
  activityImages,
  onOpenComments,
  handleCloseModalComments,
  isUserView,
  onDeletePost = () => ({}),
  showOptions,
  categoryName,
  duration,
  openModal,
  likes,
  isCurrentLike,
}: Props) {
  const queryClient = useQueryClient();
  const feed = queryClient.getQueryData<Feed>(['feed']);

  const [searchParams] = useSearchParams();
  const activityId = searchParams.get('activityId') ?? '';

  const activity = feed?.activities.find(
    (activity) => activity.id === activityId
  );

  return (
    <>
      <div className={style.post}>
        <div className={style.header}>
          <img src={author.image} alt={author.name} className={style.avatar} />
          <span className={style.authorName}>{author.name}</span>
        </div>

        <p className={style.content}>{description}</p>

        {isUserView && activityImages && (
          <div className={style.imageCarousel}>
            {activityImages.map((img: string, index: number) => (
              <div className={style.cardWrapper} key={index}>
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
            name: author.name ?? '',
            image: author.image ?? '',
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
      <CommentsModal
        comments={activity?.comments ?? []}
        key={id}
        id={id}
        open={openModal}
        onClose={handleCloseModalComments}
      />
    </>
  );
}

export default Activity;
