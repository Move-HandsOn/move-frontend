import { Modal } from '../Modal';
import style from './modalSelectGroup.module.css';
import PlaceHolder from '@/assets/placeholder.png';
 
interface ObjectGroup {
    id: string
    image: string
    name: string
}


interface ModalSelectGroupProps {
    options: ObjectGroup[]
    closeModal: () => void
    handleGroup:  (value: { name: string, idGroup: string}) => void
}

const ModalSelectGroup = ({ options, handleGroup, closeModal}: ModalSelectGroupProps) => {
  return (
    <Modal.Root>
        <Modal.Close onClick={() => closeModal()} />
        <Modal.Title>Selecione um grupo</Modal.Title>
        <div className={style.selectGroup}>
        {options.map(({id, image, name}) => (
            <div  className={style.group} key={id} 
              onClick={()=> { handleGroup({name, idGroup: id})}}
            >
            <img src={image ?? Placeholder} alt="" />
            <h1>{name}</h1>
          </div>
        ))}
        </div>
    </Modal.Root>
  );
};

export default ModalSelectGroup;
