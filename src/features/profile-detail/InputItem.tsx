import React, { useState, useEffect, useRef, RefObject } from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  submitName: (name: string) => void;
};

export const InputItem: React.FC<Props> = ({ name, setEditing, submitName }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState(name);

  const useOutsideAlert = (ref: RefObject<HTMLInputElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (ref.current && !ref.current.contains(target as HTMLElement)) {
          submitName(inputName);
          target.id !== 'profileEdit' && setEditing(false);
        }
      };

      const handleEnterKey = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          submitName(inputName);
          setEditing(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keyup', handleEnterKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keyup', handleEnterKey);
      };
    }, [ref, inputName]);
  };

  useOutsideAlert(inputRef);
  return (
    <InputWrapper className="profile-item active custom">
      <input
        ref={inputRef}
        placeholder="Enter Profile Name"
        maxLength={25}
        value={inputName}
        onChange={({ target }) => setInputName(target.value)}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
