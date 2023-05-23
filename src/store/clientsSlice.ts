import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '../models';
import { RootState } from '.';
import * as clientsApi from '../api/clients';

interface ClientsState {
  clients: Client[];
  selectedClient: Client | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ClientsState = {
  clients: [],
  selectedClient: null,
  status: 'idle',
};

export const getClients = createAsyncThunk<Client[], void>('clients/getClients', clientsApi.getClients);
export const getClient = createAsyncThunk<Client, string, {state: RootState}>('clients/getClient', async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.userReducer.user?.token as string

    return clientsApi.getClient(id, token);
});
export const addClient = createAsyncThunk<Client, Omit<Client, 'id'>, {state: RootState}>('clients/addClient', async (client, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.userReducer.user?.token as string

  return clientsApi.addClient(client, token)
});
export const editClient = createAsyncThunk<Client, Client, {state: RootState}>('clients/editClient', async (client, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.userReducer.user?.token as string

  return clientsApi.editClient(client, token)
});
export const removeClient = createAsyncThunk<string, string, {state: RootState}>('clients/removeClient', async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.userReducer.user?.token as string

  return clientsApi.removeClient(id, token)
});

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSelectedClient: (state, action: PayloadAction<Client>) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(getClients.fulfilled, (state, { payload }: PayloadAction<Client[]>) => {
        state.clients = payload;
      })
      .addCase(getClient.fulfilled, (state, { payload }: PayloadAction<Client>) => {
        state.selectedClient = payload;
      })
      .addCase(addClient.fulfilled, (state, { payload }: PayloadAction<Client>) => {
        state.clients.push(payload);
      })
      .addCase(editClient.fulfilled, (state, { payload }: PayloadAction<Client>) => {
        const index = state.clients.findIndex(client => client.id === payload.id);
        if (index !== -1) {
          state.clients[index] = payload;
        }
      })
      .addCase(removeClient.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.clients = state.clients.filter(client => client.id !== payload);
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'idle';
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelectedClient } = clientsSlice.actions;

export default clientsSlice.reducer;