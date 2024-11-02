import style from './InteractionBox.module.css';
import Heart from '../../assets/Heart.svg';
import HeartRed from '../../assets/Heart_red.svg';
import ChatText from '../../assets/ChatText.svg';
import PaperPlane from '../../assets/PaperPlaneTilt.svg';
import DotsThree from '../../assets/DotsThree.svg';
import Trash from '../../assets/Trash.svg';
import Pencil from '../../assets/PencilSimple.svg';
import { useState } from 'react';
import DeletePostModal from '../DeletePostModal/DeletePostModal';

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
  onOpenComments: () => void;
};

function InteractionBox({
  postDate,
  author,
  content,
  commentsCount,
  likes,
  likedByCurrentUser,
  onOpenComments,
}: Props) {
  const [showEditPost, setEditPost] = useState(false);
  const [isLiked, setIsLiked] = useState(likedByCurrentUser);
  const [likeCount, setLikeCount] = useState(likes);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);

    if (isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  function handleEditPost() {
    setEditPost((prevShowEditPost) => !prevShowEditPost);
  }

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

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
      <div className={style.interactionItem}>
        <img src={PaperPlane} alt="Compartilhar post" />
        <span className={style.interactionTitle}>Compartilhar</span>
      </div>
      <div className={style.interactionItem} onClick={handleEditPost}>
        <img src={DotsThree} alt="Acessar mais opções" />
        <span className={style.interactionTitle}>Opções</span>
        {showEditPost && (
          <div
            className={`${style.editPost} ${showEditPost ? style.showEditPost : ''}`}
          >
            <div className={style.interactionItem}>
              <img src={Pencil} alt="Editar Post" />
              <span className={style.interactionTitle}>Editar</span>
            </div>
            <div
              className={style.interactionItem}
              onClick={handleOpenDeleteModal}
            >
              <img src={Trash} alt="Deletar Post" />
              <span className={style.interactionTitle}>Excluir</span>
            </div>
          </div>
        )}
      </div>
      <DeletePostModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
      />
    </div>
  );
}

export default InteractionBox;
