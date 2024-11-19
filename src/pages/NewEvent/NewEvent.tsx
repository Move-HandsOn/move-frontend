import style from './newEvent.module.css';
import NavBar from '@/components/NavBar/NavBar';
import Button from '@/components/Button/Button';
import { TextArea } from '@/components/TextArea/TextArea';
import InputStd from '@/components/InputStd/InputStd';
import { DatePicker } from 'antd';
import HourInput from '@/components/HourInput/HourInput';

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
                className={style.datepicker}
            />
            <div className={style.inputs_durations}>
                <HourInput titleDefault={"Inicio"} dates={[{ label: "Inicio", value: 0}]} value={0} />
                <HourInput titleDefault={"Fim"} dates={[{ label: "Fim", value: 0}]} value={0}  />
            </div>
            <h3>Compartilhamento(Opcional)</h3>
            <div className={style.flex_row_gap_12}>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <p>Compartilhar evento no meu perfil</p>
            </div>
            <div className={style.flex_row_gap_12}>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
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
