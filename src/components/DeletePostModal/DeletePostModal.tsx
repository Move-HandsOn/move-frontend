import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '../Button/Button';
import styles from './DeletePostModal.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 182,
  bgcolor: 'var(--WHITE)',
  border: 'none',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeletePostModal({ open, onClose, onDelete }: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <Box sx={style}>
          <h3 className={styles.exclusionTitle}>Excluir publicação</h3>
          <p className={styles.exclusionText}>
            Tem certeza de que deseja excluir esta publicação?
          </p>
          <div className={styles.exclusionBtnBox}>
            <Button
              variant="gray"
              name="Cancelar"
              style={{ width: '115px', background: 'none' }}
              onClick={onClose}
            />
            <Button
              variant="standard"
              name="Excluir"
              style={{ width: '115px' }}
              onClick={onDelete}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
