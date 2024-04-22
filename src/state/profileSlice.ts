import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import { initialData } from './initialData';
import { Profile, ProfileState } from './profileTypes';

const initialState: ProfileState = { data: initialData, error: null };

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
});

export const {} = profileSlice.actions;

export const selectProfiles = (state: RootState) => [...state.profiles.data].sort((a, b) => a.position - b.position);
export const selectActiveProfile = (state: RootState) => state.profiles.data.filter(({ active }) => active)[0];

export default profileSlice.reducer;
