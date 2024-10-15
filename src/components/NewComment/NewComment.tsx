import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Avatar from '../../assets/avatar_nataliaOliveira.png';
import PaperPlaneTilt from '../../assets/PaperPlaneTiltWhite.svg';

export default function NewComment() {
  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '96%',
        height: '48px',
        position: 'absolute',
        bottom: '20px',
        padding: '12px 6px 12px 12px',
        borderRadius: '12px',
        border: '1px solid #B6B6B6',
        backgroundColor: '#FFF',
      }}
    >
      <img
        src={Avatar}
        alt="Avatar de Usuário"
        style={{ width: '28px', height: '28px', borderRadius: '50%' }}
      />
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          background: '#FFF',
          fontSize: '12px',
          fontWeight: '600',
          color: '#1E1E1E',
        }}
        placeholder="Escreva uma mensagem"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        color="primary"
        sx={{
          p: '10px',
          backgroundColor: '#085259',
          height: '32px',
          width: '32px',
          borderRadius: '8px',
        }}
        aria-label="directions"
      >
        <img
          src={PaperPlaneTilt}
          alt=""
          style={{ backgroundColor: '#085259' }}
        />
      </IconButton>
    </Paper>
  );
}
