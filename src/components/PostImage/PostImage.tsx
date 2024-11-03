import style from './PostImage.module.css';

type Props = {
  image: string;
};

function PostImage({ image }: Props) {
  return (
    <div className={style.groupCard}>
      <img src={image} alt={''} className={style.groupImage} />
    </div>
  );
}

export default PostImage;
