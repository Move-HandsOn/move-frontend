import PublishOptionsList from '@/components/PublishOptionsList/PublishOptionsList';
import style from './NewActivity.module.css';
import { useState } from 'react';
import ActivityList from '@/components/ActivityList/ActivityList';
import NavBar from '@/components/NavBar/NavBar';
import DateInput from '@/components/DateInput/DateInput';
import HourInput from '@/components/HourInput/HourInput';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';

function NewActivity() {
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    'Publicar em meu perfil',
    'Apenas registrar e não publicar',
    'Publicar em um grupo',
  ];

  const dates: Array<string> = ['teste'];
  const hours: Array<string> = ['10:20', '181:50'];

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
          dates={dates}
          value={selectedOption}
          onChange={handleSelectChange}
        />
        <HourInput
          dates={hours}
          value={selectedOption}
          onChange={handleSelectChange}
        />
      </div>
      <h3>Detalhes da atividade</h3>
      <TextArea 
        id="activity-details" 
        placeholder="Detalhes da minha atividade (Opcional)"
      ></TextArea>
      <Button variant="gray" name="Adicionar Fotos" />
      <Button variant="gray" name="Publicar" />
    </div>
  );
}

export default NewActivity;
