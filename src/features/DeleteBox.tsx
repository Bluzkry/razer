import React, { useEffect, useRef, RefObject } from 'react';

import { useAppDispatch } from '../app/hooks';
import { deleteProfile } from '../state/profileSlice';

type Props = {
  id: string;
  name: string;
  position: number;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteBox: React.FC<Props> = ({ id, name, position, setDeleting }) => {
  const deleteRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const useOutsideAlert = (ref: RefObject<HTMLInputElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (ref.current && !ref.current.contains(target as HTMLElement)) setDeleting(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [deleteRef]);
  };

  useOutsideAlert(deleteRef);
  return (
    <div className="profile-del alert flex" ref={deleteRef}>
      <div className="title">delete eq</div>
      <div className="body-text t-center">{name}</div>
      <div
        className="thx-btn"
        onClick={() => {
          dispatch(deleteProfile({ id, position: position }));
          setDeleting(false);
        }}
      >
        delete
      </div>
    </div>
  );
};
