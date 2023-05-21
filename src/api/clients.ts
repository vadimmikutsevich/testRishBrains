import axios from 'axios';
import { Client } from '../models';

const API_URL = 'http://localhost:3333';

export const getClients = async (): Promise<Client[]> => {

  try {
    const response = await axios.get<{clients: Client[]}>(`${API_URL}/clients`);
    return response.data.clients;
  } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not fetch clients: ${error.message}`);
      } else {
        throw new Error(`Could not fetch clients: ${error}`);
      }
  }
};

export const getClient = async (id: string, token: string): Promise<Client> => {
  try {
    const response = await axios.post<{client: Client}>(
      `${API_URL}/clients/get`,
      { id },
      {
        headers: {
          'Authorization': token
        }
      }
    );

    return response.data.client;

  } catch (error) {
    if(error instanceof Error) {
      throw new Error(`Could not fetch client with id ${id}: ${error.message}`);
    } else {
      throw new Error(`Could not fetch client with id ${id}: ${error}`);
    }
  }
};

export const addClient = async (client: Client, token: string): Promise<Client> => {
  try {
    const response = await axios.post<Client>(`${API_URL}/clients/add`, client, {
      headers: {
        'Authorization': token
      }
    });
    if (response.status !== 201) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    if(error instanceof Error) {
      throw new Error(`Could not add client: ${error.message}`);
    } else {
      throw new Error(`Could not add client: ${error}`);
    }
  }
};

export const editClient = async (client: Client, token: string): Promise<Client> => {
  try {
    const response = await axios.put<Client>(`${API_URL}/clients/edit`, client, {
      headers: {
        'Authorization': token
      }
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    if(error instanceof Error){
      throw new Error(`Could not edit client: ${error.message}`);
    } else {
      throw new Error(`Could not edit client: ${error}`);
    }
  }
};

export const removeClient = async (id: string, token: string): Promise<string> => {
  try {
    const response = await axios.delete(`${API_URL}/clients/remove?id=${id}`, {
      headers: {
        'Authorization': token
      }
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
    return id;
  } catch (error) {
    if(error instanceof Error){
      throw new Error(`Could not remove client with id ${id}: ${error.message}`);
    } else {
      throw new Error(`Could not remove client with id ${id}: ${error}`);
    }
  }
};