import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import clientsReducer from './clientsSlice';

const rootReducer = combineReducers({
    userReducer, clientsReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = Store['dispatch']