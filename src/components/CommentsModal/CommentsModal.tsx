import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import X from '../../assets/X.svg';
import Comments from '../Comments/Comments';
import NewComment from '../NewComment/NewComment';

const style = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '686px',
  borderRadius: '24px 24px 0px 0px',
  padding: '56px 16px 16px 16px',
  bgcolor: '#F6F6F6',
  border: 'none',
  boxShadow: '0px -1px 11px 0px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  justifyContent: 'space-between',
  outline: 'none',
  flexDirection: 'column',
  boxSizing: 'border-box',
};

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
  open: boolean;
  onClose: () => void;
  id: string;
  profileImage?: string;
  listComments: IComments[];
};

export default function CommentsModal({
  open,
  onClose,
  id,
  profileImage,
  listComments,
}: Props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <Box sx={style}>
          <img
            src={X}
            alt=""
            style={{
              position: 'absolute',
              top: '18px',
              right: '14px',
              width: '20px',
              height: '20px',
              cursor: 'pointer',
            }}
            onClick={onClose}
          />
          <Comments listComments={listComments} id={id} />
          <NewComment id={id} profileImage={profileImage} />
        </Box>
      </Modal>
    </div>
  );
}
