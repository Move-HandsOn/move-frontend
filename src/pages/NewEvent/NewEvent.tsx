import style from './newEvent.module.css';
import NavBar from '@/components/NavBar/NavBar';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';
import InputStd from '@/components/InputStd/InputStd';
import { DatePicker } from 'antd';

function NewEvent() {
  return (
    <div className={style.container}>
      <NavBar title="Novo Evento" />
      <form className={style.formContainer}>
        <div className={style.register}>
          <div className={style.group}>
            <h3>Detalhes do evento</h3>
            <InputStd style={{ width: "100%"}} placeholder='Título do evento' />
            <TextArea 
              id="activity-details" 
              placeholder="Descrição (Opcional)"
            ></TextArea>
            <InputStd style={{ width: "100%"}} placeholder='Local (Escreva a Localização)' />
            <DatePicker
                placeholder='Quando?'
            />
            <div className={style.inputs_durations}>
              
            </div>
          </div>

          <div className={style.group}>
            <h3>Compartilhamento(Opcional)</h3>
          </div>
        </div>
        <Button variant="gray" name="Salvar" type='submit'/>
      </form>
    </div>
  );
}

export default NewEvent;
