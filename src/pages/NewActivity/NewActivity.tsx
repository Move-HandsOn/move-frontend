import PublishOptionsList from '@/components/PublishOptionsList/PublishOptionsList';
import style from './NewActivity.module.css';
import { useState } from 'react';
import ActivityList from '@/components/ActivityList/ActivityList';
import NavBar from '@/components/NavBar/NavBar';
import DateInput from '@/components/DateInput/DateInput';
import HourInput from '@/components/HourInput/HourInput';

function NewActivity() {
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    'Publicar em meu perfil',
    'Apenas registrar e não publicar',
    'Publicar em um grupo',
  ];

  const dates = ['teste'];
  const hours = ['10:20', '18:50'];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={style.container}>
      <NavBar title="Novo Registro" />
      <h3>Detalhes da atividade</h3>
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
      <div className={style.inputs_date_time}>
        <DateInput
          options={dates}
          value={selectedOption}
          onChange={handleSelectChange}
        />
        <HourInput
          options={hours}
          value={selectedOption}
          onChange={handleSelectChange}
        />
      </div>
    </div>
  );
}

export default NewActivity;
