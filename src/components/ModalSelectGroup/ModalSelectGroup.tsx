import { Modal } from '../Modal';
import style from './modalSelectGroup.module.css';

 
interface ObjectGroup {
    id: number
    image: string
    name: string
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
        <div className={style.selectGroup}>
        {options.map(({id, image, name}) => (
            <div  className={style.group} key={id} >
            <img src={image} alt="" />
            <h1>{name}</h1>
          </div>
        ))}
        </div>
    </Modal.Root>
  );
};

export default ModalSelectGroup;
