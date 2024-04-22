import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import { initialData } from './initialData';
import { Profile, ProfileState } from './profileTypes';

const initialState: ProfileState = { data: initialData, error: null };

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setSelectedProfile: (state, { payload }: { payload: string }) => {
      const updatedProfiles = state.data.map((profile) => {
        if (profile.id === payload) return { ...profile, active: true };
        return { ...profile, active: false };
      });

      return {
        ...state,
        data: updatedProfiles,
      };
    },
    moveProfile: (state, { payload }: { payload: { id: string; moveUp: boolean } }) => {
      const selectedProfilePosition = state.data.find(({ id }) => id === payload.id)?.position;

      if (!selectedProfilePosition) {
        console.error('Unable to change position of profile.');
        return {
          ...state,
          error: new Error('Could not find "selectedProfile."'),
        };
      }

      const data = state.data.reduce<Array<Profile>>((profiles, profile) => {
        let { position } = profile;
        if (payload.moveUp) {
          if (profile.position === selectedProfilePosition - 1) position++;
          if (profile.id === payload.id) position--;
        } else {
          if (profile.position === selectedProfilePosition + 1) position--;
          if (profile.id === payload.id) position++;
        }

        return [...profiles, { ...profile, position }];
      }, []);

      return {
        ...state,
        data,
      };
    },
    addProfile: (state) => {
      const newProfile = {
        id: Math.floor(Math.random() * 100000000).toString(), // TODO: In real project, replace with real random number generator.
        position: state.data.length + 1,
        type: 'custom',
        name: 'New Profile',
        active: true,
      };

      return {
        ...state,
        data: [...state.data.map((profile) => ({ ...profile, active: false })), newProfile],
      };
    },
    deleteProfile: (state, { payload }: { payload: { id: string; position: number } }) => {
      const data = state.data.reduce<Array<Profile>>((profiles, profile) => {
        let { id, active, position } = profile;
        if (payload.id === id) return profiles;
        if (payload.position < profile.position) position--;
        if (payload.position === profile.position + 1) active = true;
        return [...profiles, { ...profile, active, position }];
      }, []);

      return {
        ...state,
        data,
      };
    },
  },
});

export const { setSelectedProfile, moveProfile, addProfile, deleteProfile } = profileSlice.actions;

export const selectProfiles = createSelector(
  (state: RootState) => state.profiles.data,
  (data) => [...data].sort((a, b) => a.position - b.position),
);
export const selectActiveProfile = (state: RootState) => state.profiles.data.filter(({ active }) => active)[0];

export default profileSlice.reducer;
