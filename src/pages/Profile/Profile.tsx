import ProfileCard from '@/components/ProfileCard/ProfileCard';
import ProfileData from '../../mocks/profileData.json';
import { useState } from 'react';
import style from './Profile.module.css';
import Button from '@/components/Button/Button';
import BarChart from '../../components/BarChart/BarChart';

function Profile() {
  const [profileData] = useState(ProfileData);
  return (
    <div className={style.container}>
      <ProfileCard
        name={profileData.name}
        image={profileData.image}
        followers={profileData.followers}
        following={profileData.following}
        groups={profileData.groups}
        notification={profileData.notification}
        dailyAverage={''}
        activityRecords={[]}
      />
      <div className={style.buttonBox}>
        <Button
          name="Minha Evolução"
          variant="standard"
          style={{
            width: '163px',
            marginTop: 0,
            borderRadius: '0px',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
            fontSize: '14px',
          }}
        />
        <Button
          name="Meus Registros"
          variant="gray"
          style={{
            width: '163px',
            marginTop: 0,
            borderRadius: '0px',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
            fontSize: '14px',
          }}
        />
      </div>
      <BarChart
        dailyAverage={ProfileData.dailyAverage}
        activityRecords={ProfileData.activityRecords}
      />
    </div>
  );
}

export default Profile;
