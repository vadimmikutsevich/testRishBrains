import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import clientsReducer from './clientsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    clients: clientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;