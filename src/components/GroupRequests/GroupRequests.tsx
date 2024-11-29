import style from './GroupRequests.module.css';
import RequestGroupCard from '../RequestGroupCard/RequestGroupCard';
import { useState } from 'react';
import peopleData from '../../mocks/peopleData.json';

const GroupRequests = () => {
  const [listPeople] = useState(peopleData);

  return (
    <ul className={style.list_container}>
      {listPeople.map((people) => (
        <RequestGroupCard
          id={people.id}
          name={people.name}
          image={people.group_image}
        />
      ))}
    </ul>
  );
};

export default GroupRequests;
