import throttle from 'lodash/throttle';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { loadFromLocalStorage, saveToLocalStorage } from '../state/persistState';
import profileReducer from '../state/profileSlice';
import { ProfileState } from '../state/profileTypes';

// @ts-ignore
// const composeEnhancers = (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

const cachedStore: { profiles: ProfileState } = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
  },
  preloadedState: cachedStore,
});

store.subscribe(
  throttle(() => {
    saveToLocalStorage({ profiles: store.getState().profiles });
  }, 1000),
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
