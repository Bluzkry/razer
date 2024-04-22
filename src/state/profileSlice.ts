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
  },
});

export const { setSelectedProfile } = profileSlice.actions;

export const selectProfiles = createSelector(
  (state: RootState) => state.profiles.data,
  (data) => [...data].sort((a, b) => a.position - b.position),
);
export const selectActiveProfile = (state: RootState) => state.profiles.data.filter(({ active }) => active)[0];

export default profileSlice.reducer;
