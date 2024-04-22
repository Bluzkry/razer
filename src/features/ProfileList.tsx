import React from 'react';
import { useAppSelector } from '../app/hooks';
import { ProfileItem } from './ProfileItem';
import { selectProfiles } from '../state/profileSlice';

type Props = {};

export const ProfileList: React.FC<Props> = ({}) => {
  const profiles = useAppSelector(selectProfiles);

  return (
    <div className="thx-drawer flex">
      <div className="main-title">Profile List</div>
      <div id="profileWrapper" className="drawer-select flex">
        <div id="profileList" className="scrollable">
          {profiles.map(({ id, type, name, active }) => (
            <ProfileItem key={id} id={id} type={type} name={name} active={active} />
          ))}
          <input id="profileRename" className="profile-item" placeholder="Enter Profile Name" maxLength={25} />
        </div>
        <div className="toolbar flex">
          <div className="icon add" id="profileAdd"></div>
          <div className="icon edit" id="profileEdit"></div>
          <div className="icon delete" id="profileDelete"></div>

          <div className="icon down" id="profileDown"></div>
          <div className="icon up disabled" id="profileUp"></div>
        </div>
        <div id="profileDelCfm" className="profile-del alert flex">
          <div className="title">delete eq</div>
          <div className="body-text t-center" id="delName">
            delete eq
          </div>
          <div className="thx-btn" id="cfmDelete">
            delete
          </div>
        </div>
      </div>
    </div>
  );
};
