import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '../Button/Button';

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
};

export default function DeletePostModal({ open, onClose }: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3
            style={{ fontSize: '16px', fontWeight: '700', textAlign: 'center' }}
          >
            Excluir publicação
          </h3>
          <p
            style={{
              fontSize: '14px',
              fontWeight: '400',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            Tem certeza de que deseja excluir esta publicação?
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '13px',
              gap: '16px',
            }}
          >
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
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
