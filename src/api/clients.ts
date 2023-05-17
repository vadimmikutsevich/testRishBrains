import axios from 'axios';
import { Client } from '../models';

export const getClients = async (): Promise<Client[]> => {
  const response = await axios.get<Client[]>('http://localhost:3333/clients');
  return response.data;
};

export const getClient = async (id: string): Promise<Client> => {
  const response = await axios.post<Client>('http://localhost:3333/clients/get', { id });
  return response.data;
};

export const addClient = async (client: Client): Promise<Client> => {
  const response = await axios.post<Client>('http://localhost:3333/clients/add', client);
  return response.data;
};

export const editClient = async (client: Client): Promise<Client> => {
  const response = await axios.put<Client>('http://localhost:3333/clients/edit', client);
  return response.data;
};

export const removeClient = async (id: string): Promise<string> => {
  await axios.delete(`http://localhost:3333/clients/remove?id=${id}`);
  return id;
};