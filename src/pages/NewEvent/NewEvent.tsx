import style from './newEvent.module.css';
import NavBar from '@/components/NavBar/NavBar';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';
import InputStd from '@/components/InputStd/InputStd';
import { DatePicker, TimePicker } from 'antd';

function NewEvent() {
  const format = 'h:mm';

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
                className={style.datepicker}
            />
            <div className={style.inputs_durations}>
              <TimePicker
                  placeholder='Inicio'
                  className={style.datepicker}
                  format={format}
              />
              <TimePicker
                  className={style.datepicker}
                  format={format}
              />
            </div>
            <h3>Compartilhamento(Opcional)</h3>
            <div className={style.flex_row_gap_12}>
                <input type="checkbox" name="profile" />
                <p>Compartilhar evento no meu perfil</p>
            </div>
            <div className={style.flex_row_gap_12}>
                <input type="checkbox" name="group" />
                <p>Adicionar evento em um grupo</p>
            </div>
          </div>
        </div>
        <Button variant="standard" name="Salvar" type='submit'/>
      </form>
    </div>
  );
}

export default NewEvent;
