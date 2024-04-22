import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectActiveProfile } from '../../state/profileSlice';

export const ProfileView: React.FC = () => {
  const profile = useAppSelector(selectActiveProfile);

  return (
    <div className="thx-window">
      <div className="sub-title flex">
        <h1 id="eqTitle" className="eq-title">
          {profile.name}
        </h1>
      </div>
    </div>
  );
};
