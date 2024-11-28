import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface ILoadingProps {
  show: boolean;
}

function LinearIndeterminate({ show }: ILoadingProps) {
  return (
    <>
      {show && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 10,
            background: 'rgba(0,0,0,0.2)',
          }}
        >
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LinearProgress color="primary" />
          </Box>
        </Box>
      )}
    </>
  );
}

export default LinearIndeterminate;
