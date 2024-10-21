import PublishOptionsList from '@/components/PublishOptionsList/PublishOptionsList';
import style from './NewActivity.module.css';
import { useState } from 'react';
import ActivityList from '@/components/ActivityList/ActivityList';
import NavBar from '@/components/NavBar/NavBar';
import HourInput from '@/components/HourInput/HourInput';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';
import ModalSelectGroup from '@/components/ModalSelectGroup/ModalSelectGroup';
import GroupData from '../../mocks/groupData.json';
import { DatePicker } from "antd"

function NewActivity() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedActivities, setSelectedActivities] = useState('');

  const [options, setOptions] = useState<Array<string>>([
    'Publicar em meu perfil',
    'Apenas registrar e não publicar',
    'Publicar em um grupo',
  ])

  const activitiesDone: Array<string> = [
    "Conteúdo em texto",
    "Corrida",
    "Caminhada",
    "Ciclismo",
    "Trilha",
    "Futebol",
    "Basquete",
    "Vôlei",
    "Tênis",
    "Natação",
    "Musculação",
    "Crossfit"
  ];

  const [modalSelectGroupActivited, setModalSelectGroupActivited] = useState<boolean>(false);
  const [groupSelected, setGroupSelected] = useState<{name: string, idGroup: number} | undefined>(undefined)

  const hours: Array<string> = ['10:20', '181:50'];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectActivity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivities(event.target.value);
  };


  const handleSelectPublishChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if(event.target.value === "Publicar em um grupo"){
      setModalSelectGroupActivited(true);
    } else if(event.target.value !== "Publicar em um grupo" && groupSelected!.name){
      setModalSelectGroupActivited(false);
      setOptions((prevOptions) =>
        prevOptions.filter((option) => option !== groupSelected!.name)
      );
      setGroupSelected(undefined);
    }
  }

  const handleGroup = (value: { idGroup: number, name: string}) => {
    setSelectedOption(value.name);
    setModalSelectGroupActivited(false);
    setOptions((prevOptions) =>
      [...prevOptions, value.name]
    );
    setGroupSelected({name: value.name, idGroup: value.idGroup})
  }
  

  return (
    <div className={style.container}>
      <NavBar title="Novo Registro" />
      <div className={style.formContainer}>
        <div className={style.register}>
          <div className={style.group}>
            <h3>Detalhes da atividade</h3>
            <PublishOptionsList
              options={options}
              value={selectedOption}
              onChange={handleSelectPublishChange}
            />
            <ActivityList
              options={activitiesDone}
              value={selectedActivities}
              onChange={handleSelectActivity}
            />
            <div className={style.inputs_date_time}>
              <DatePicker
                placeholder='Quando?'
                className={style.datepicker}
              />
              <HourInput
                dates={hours}
                value={selectedOption}
                onChange={handleSelectChange}
              />
            </div>
          </div>

          <div className={style.group}>
            <h3>Detalhes da atividade</h3>
            <TextArea 
              id="activity-details" 
              placeholder="Detalhes da minha atividade (Opcional)"
              ></TextArea>
            <Button variant="gray" name="Adicionar Fotos" />
          </div>
        </div>
        <Button variant="gray" name="Publicar" />
      </div>
     {modalSelectGroupActivited && <ModalSelectGroup 
        options={GroupData.map(({id, name, image}) => ({ id, name, image}))}
        closeModal={()=>{ setModalSelectGroupActivited(false)}}
        handleGroup={handleGroup}
      />}
    </div>
  );
}

export default NewActivity;
