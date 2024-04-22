import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { DeleteBox } from './DeleteBox';
import { ProfileItem } from './ProfileItem';
import { selectProfiles, selectActiveProfile, moveProfile, addProfile } from '../state/profileSlice';

type Props = {};

export const ProfileList: React.FC<Props> = ({}) => {
  const profiles = useAppSelector(selectProfiles);
  const activeProfile = useAppSelector(selectActiveProfile);
  const dispatch = useAppDispatch();

  const [deleting, setDeleting] = useState(false);

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
          <div className="icon add" onClick={() => dispatch(addProfile())} />
          <div className="icon edit" />
          {activeProfile.type === 'custom' && <div className="icon delete" onClick={() => setDeleting(true)} />}

          <div
            className={`icon down ${activeProfile.position === profiles.length && 'disabled'}`}
            onClick={() => dispatch(moveProfile({ id: activeProfile.id, moveUp: false }))}
          />
          <div
            className={`icon up ${activeProfile.position === 1 && 'disabled'}`}
            onClick={() => dispatch(moveProfile({ id: activeProfile.id, moveUp: true }))}
          />
        </div>

        {deleting && (
          <DeleteBox
            id={activeProfile.id}
            name={activeProfile.name}
            position={activeProfile.position}
            setDeleting={setDeleting}
          />
        )}
      </div>
    </div>
  );
};
