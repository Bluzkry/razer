import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import profileReducer from '../state/profileSlice';

// @ts-ignore
const composeEnhancers = (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
