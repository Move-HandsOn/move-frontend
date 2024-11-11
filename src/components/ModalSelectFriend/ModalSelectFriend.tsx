import { useQuery } from '@tanstack/react-query';
import { Modal } from '../Modal';
import style from './modalSelectFriend.module.css'
import SearchBar from './SearchBar/SearchBar';
import { useState } from 'react';
 
interface ObjectFriend {
    id: string;
    image: string;
    name: string;
}

const friends: ObjectFriend[] = [
    {
        id: "1",
        image: "src/assets/avatar_taisSantana.jpg",
        name: "Alice"
    },
    {
        id: "2",
        image: "src/assets/avatar_taisSantana.jpg",
        name: "Bob"
    },
    {
        id: "3",
        image: "src/assets/avatar_taisSantana.jpg",
        name: "Charlie"
    }
];


interface ModalSelectFriendProps {
    closeModal: () => void
    handleGroup:  (value: { name: string, idFriend: string, image: string}) => void
}

const ModalSelectFriend = ({ handleGroup, closeModal}: ModalSelectFriendProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const { data } = useQuery({
        queryKey: ['myGroups', searchTerm],
        queryFn: (): ObjectFriend[] => {
           if(searchTerm){ 
            return friends.filter(friend =>
                friend.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
           } 

           return friends;
        }
    })

    return (
        <Modal.Root>
            <Modal.Close onClick={() => closeModal()} />
            <Modal.Title>Selecione um amigo</Modal.Title>
            <div className={style.navContainer}>
                <SearchBar inputProps={{ value: searchTerm, onChange: handleSearchChange }} />
            </div>
            <div className={style.selectFriend}>
            {data && data.map(({id, image, name}) => (
                <div  className={style.friend} key={id} 
                onClick={()=> { handleGroup({name, idFriend: id, image})}}
                >
                <img src={image} alt="" />
                <h1>{name}</h1>
            </div>
            ))}
            </div>
        </Modal.Root>
    );
};

export default ModalSelectFriend;
