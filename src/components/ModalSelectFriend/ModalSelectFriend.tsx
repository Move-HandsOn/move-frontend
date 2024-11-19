import { useQuery } from '@tanstack/react-query';
import { Modal } from '../Modal';
import style from './modalSelectFriend.module.css'
import SearchBar from './SearchBar/SearchBar';
import { useState } from 'react';
import { myFriendsRequest } from '@/services/requests';

interface ModalSelectFriendProps {
    closeModal: () => void
    handleGroup:  (value: { name: string, idFriend: string, image: string}) => void
}

const ModalSelectFriend = ({ handleGroup, closeModal}: ModalSelectFriendProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data } = useQuery({
        queryKey: ['myFriends', searchTerm],
        queryFn: async () => {
            const response = await myFriendsRequest();
            return searchTerm ? response?.filter(friend =>
                friend.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) : response;
        }
      })

      

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Modal.Root>
            <Modal.Close onClick={() => closeModal()} />
            <Modal.Title>Selecione um amigo</Modal.Title>
            <div className={style.navContainer}>
                <SearchBar inputProps={{ value: searchTerm, onChange: handleSearchChange }} />
            </div>
            <div className={style.selectFriend}>
            {data && data.map(({id, profile_image, name}) => (
                <div  className={style.friend} key={id} 
                onClick={()=> { handleGroup({name, idFriend: id, image: profile_image})}}
                >
                <img src={profile_image} alt="" />
                <h1>{name}</h1>
            </div>
            ))}
            </div>
        </Modal.Root>
    );
};

export default ModalSelectFriend;
