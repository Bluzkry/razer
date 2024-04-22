import React from 'react';
import { useAppSelector } from '../app/hooks';
import { ProfileItem } from './ProfileItem';
import { selectProfiles, selectActiveProfile } from '../state/profileSlice';

type Props = {};

export const ProfileList: React.FC<Props> = ({}) => {
  const profiles = useAppSelector(selectProfiles);
  const activeProfile = useAppSelector(selectActiveProfile);

  return (
    <div className="thx-drawer flex">
      <div className="main-title">Profile List</div>
      <div className="drawer-select flex">
        <div id="profileList" className="scrollable">
          {profiles.map(({ id, type, name, active }) => (
            <ProfileItem key={id} id={id} type={type} name={name} active={active} />
          ))}
          <input className="profile-item" placeholder="Enter Profile Name" maxLength={25} />
        </div>
        <div className="toolbar flex">
          <div className="icon add" />
          <div className="icon edit" />
          <div className="icon delete" />

          <div className="icon down"></div>
          <div className="icon up disabled"></div>
        </div>
        <div className="profile-del alert flex">
          <div className="title">delete eq</div>
          <div className="body-text t-center">delete eq</div>
          <div className="thx-btn">delete</div>
        </div>
      </div>
    </div>
  );
};
