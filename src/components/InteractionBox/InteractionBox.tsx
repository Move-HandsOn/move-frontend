import { changeLikeActivity } from '@/services/requests';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import ChatText from '../../assets/ChatText.svg';
import DotsThree from '../../assets/DotsThree.svg';
import Heart from '../../assets/Heart.svg';
import HeartRed from '../../assets/Heart_red.svg';
import Trash from '../../assets/Trash.svg';
import DeletePostModal from '../DeletePostModal/DeletePostModal';
import style from './InteractionBox.module.css';

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
  onOpenComments: () => void;
  onDeletePost: (id: string) => void;
  showOptions?: boolean;
};

function InteractionBox({
  id,
  commentsCount,
  likes,
  likedByCurrentUser,
  onOpenComments,
  showOptions,
  onDeletePost,
}: Props) {
  const [showEditPost, setEditPost] = useState(false);
  const [isLiked, setIsLiked] = useState(likedByCurrentUser);
  const [likeCount, setLikeCount] = useState(likes);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { mutateAsync: changeLikeAsync } = useMutation({
    mutationFn: async () => {
      await changeLikeActivity({ activity_id: id });
    },
  });

  const handleLikeClick = () => {
    changeLikeAsync();

    setIsLiked(!isLiked);

    if (isLiked) {
      setLikeCount(likeCount + 1);
      return;
    }
    setLikeCount(likeCount - 1);
  };

  function handleEditPost() {
    setEditPost((prevShowEditPost) => !prevShowEditPost);
  }

  function handleDeletePost() {
    onDeletePost(id);
    setOpenDeleteModal(false);
  }

  return (
    <div className={style.container}>
      <div className={style.interactionItem} onClick={handleLikeClick}>
        {isLiked ? <img src={HeartRed} /> : <img src={Heart} />}
        <span className={style.interactionTitle}>Curtir</span>
      </div>
      <div className={style.interactionItem} onClick={onOpenComments}>
        <img src={ChatText} alt="Comentar post" />
        <span className={style.interactionTitle}>Comentar</span>
        <aside>{commentsCount}</aside>
      </div>
      {showOptions && (
        <div className={style.interactionItem} onClick={handleEditPost}>
          <img src={DotsThree} alt="Acessar mais opções" />
          <span className={style.interactionTitle}>Opções</span>
          {showEditPost && (
            <div
              className={`${style.editPost} ${showEditPost ? style.showEditPost : ''}`}
            >
              <div
                className={style.interactionItem}
                onClick={() => setOpenDeleteModal(true)}
              >
                <img src={Trash} alt="Deletar Post" />
                <span className={style.interactionTitle}>Excluir</span>
              </div>
            </div>
          )}
        </div>
      )}

      <DeletePostModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDeletePost}
      />
    </div>
  );
}

export default InteractionBox;
