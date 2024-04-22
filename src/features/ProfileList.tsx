import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { DeleteBox } from './DeleteBox';
import { InputItem } from './InputItem';
import { ProfileItem } from './ProfileItem';
import { selectProfiles, selectActiveProfile, moveProfile, addProfile, renameProfile } from '../state/profileSlice';

type Props = {};

export const ProfileList: React.FC<Props> = ({}) => {
  const profiles = useAppSelector(selectProfiles);
  const activeProfile = useAppSelector(selectActiveProfile);
  const dispatch = useAppDispatch();

  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const submitName = (name: string) => {
    if (name !== '' && name !== activeProfile.name) {
      dispatch(renameProfile({ id: activeProfile.id, name: name.trim() }));
    }
  };

  return (
    <div className="thx-drawer flex">
      <div className="main-title">Profile List</div>
      <div className="drawer-select flex">
        <div id="profileList" className="scrollable">
          {profiles.map(({ id, type, name, active }) =>
            editing && active ? (
              <InputItem key={id} name={name} setEditing={setEditing} submitName={submitName} />
            ) : (
              <ProfileItem key={id} id={id} type={type} name={name} active={active} />
            ),
          )}
        </div>

        <div className="toolbar flex">
          <div className="icon add" onClick={() => dispatch(addProfile())} />
          <div className="icon edit" />
          {activeProfile.type === 'custom' && (
            <>
              <div id="profileEdit" className="icon edit" onClick={() => setEditing(!editing)} />
              <div className="icon delete" onClick={() => setDeleting(true)} />
            </>
          )}

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
