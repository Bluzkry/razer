import React from 'react';

type Props = {
  id: string;
  type: string;
  name: string;
  active?: boolean;
};

export const ProfileItem: React.FC<Props> = ({ id, type, name, active = false }) => {
  return <div className={`profile-item ${active && 'active'} ${type} no-edit`}>{name}</div>;
};
