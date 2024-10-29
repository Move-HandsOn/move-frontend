import ProfileCard from '@/components/ProfileCard/ProfileCard';
import ProfileData from '../../mocks/profileData.json';
import { useState } from 'react';
import style from './Profile.module.css';

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
      />
    </div>
  );
}

export default Profile;
