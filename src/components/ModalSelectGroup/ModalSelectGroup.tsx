import { Modal } from '../Modal';
import style from './modalSelectGroup.module.css';

 
interface ObjectGroup {
    id: string
    Image: string
    Name: string
}


interface ModalSelectGroupProps {
    options: ObjectGroup[]
    closeModal: () => void
}

const ModalSelectGroup = ({ options, closeModal}: ModalSelectGroupProps) => {
  return (
    <Modal.Root>
        <Modal.Close onClick={() => closeModal()} />
        <Modal.Title>Selecione um grupo</Modal.Title>
        {options.map(({id, Image, Name}) => (
          <div  className={style.selectGroup} key={id} >
            <img src={Image} alt="" />
            <h1>{Name}</h1>
          </div>
        ))}
    </Modal.Root>
  );
};

export default ModalSelectGroup;
