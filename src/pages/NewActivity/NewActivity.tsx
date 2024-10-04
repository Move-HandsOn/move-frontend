import PublishOptionsList from '@/components/PublishOptionsList/PublishOptionsList';
import style from './NewActivity.module.css';
import { useState } from 'react';
import ActivityList from '@/components/ActivityList/ActivityList';

function NewActivity() {
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    'Publicar em meu perfil',
    'Apenas registrar e não publicar',
    'Publicar em um grupo',
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={style.container}>
      <PublishOptionsList
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
      />
      <ActivityList
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
      />
    </div>
  );
}

export default NewActivity;
