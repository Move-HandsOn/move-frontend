import React, { forwardRef } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import MagnifyingGlass from '@/assets/MagnifyingGlass.svg';

interface SearchBarProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ inputProps }, ref) => {
  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '48px',
        padding: '12px 16px',
        borderRadius: '8px',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: '#E7E7E7',
        gap: '23px',
        color: '#1E1E1E',
      }}
    >
      <img
        src={MagnifyingGlass}
        alt="Logo de busca"
        style={{
          width: '24px',
          height: '24px',
          background: '#E7E7E7',
          cursor: 'pointer',
        }}
      />
      <InputBase
        ref={ref}
        sx={{
          ml: 1,
          flex: 1,
          background: '#E7E7E7',
          fontSize: '16px',
          fontWeight: '700',
          color: '#1E1E1E',
          '& input::placeholder': {
            color: '#1E1E1E',
            opacity: 1,
          },
        }}
        placeholder="Pesquisar"
        inputProps={{ 'aria-label': 'search google maps', ...inputProps }}
      />
    </Paper>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
