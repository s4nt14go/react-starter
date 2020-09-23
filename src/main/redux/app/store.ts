import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer, { defaultState as counterStateDefault } from '../features/counter/counterSlice';
import {saveState} from './localStorage';
import throttle from 'lodash/throttle';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

store.subscribe(throttle(() => {
  const counterState = store.getState().counter;
  saveState({
    counter: {
      ...counterStateDefault,
      value: counterState.value,
    }
  });
}, 1000));
