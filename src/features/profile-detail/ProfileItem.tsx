import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import { setSelectedProfile } from '../../state/profileSlice';

type Props = {
  id: string;
  type: string;
  name: string;
  active?: boolean;
};

export const ProfileItem: React.FC<Props> = ({ id, type, name, active = false }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`profile-item ${active && 'active'} ${type}`} onClick={() => dispatch(setSelectedProfile(id))}>
      {name}
    </div>
  );
};
