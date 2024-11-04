import style from './PostImage.module.css';

type Props = {
  image: string;
};

function PostImage({ image }: Props) {
  return (
    <div className={style.imageCard}>
      <img src={image} alt={''} className={style.activityImage} />
    </div>
  );
}

export default PostImage;
