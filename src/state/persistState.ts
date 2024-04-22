import { ProfileState } from './profileTypes';

export const loadFromLocalStorage = () => {
  try {
    const cachedState = localStorage.getItem('profiles');
    if (!cachedState) return undefined;
    return JSON.parse(cachedState);
  } catch (e) {
    console.error(e);
  }
};

export const saveToLocalStorage = (state: { profiles: ProfileState }) => {
  try {
    localStorage.setItem('profiles', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};
