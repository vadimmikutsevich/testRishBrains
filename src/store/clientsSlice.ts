import { createSlice, createAsyncThunk, isPending, isFulfilled, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '../models';
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
export const getClient = createAsyncThunk<Client, string>('clients/getClient', clientsApi.getClient);
export const addClient = createAsyncThunk<Client, Client>('clients/addClient', clientsApi.addClient);
export const editClient = createAsyncThunk<Client, Client>('clients/editClient', clientsApi.editClient);
export const removeClient = createAsyncThunk<string, string>('clients/removeClient', clientsApi.removeClient);

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'idle';
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed';
      });

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
      });
  },
});

export default clientsSlice.reducer;