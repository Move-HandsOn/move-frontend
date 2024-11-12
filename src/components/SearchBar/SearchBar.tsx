import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import MagnifyingGlass from '../../assets/MagnifyingGlass.svg';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '324px',
        height: '48px',
        padding: '12px 16px',
        borderRadius: '8px',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: '#E7E7E7',
        gap: '23px',
        color: '#1E1E1E',
        position: 'absolute',
        right: '15px',
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
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </Paper>
  );
}
