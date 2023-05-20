import axios from 'axios';
import { User, UserLoginPayload } from '../models';

const API_URL = 'http://localhost:3333';

export const loginUser = async (payload: UserLoginPayload): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/user/login`, payload);
    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
    
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Could not login user: ${error.message}`);
    } else {
      throw new Error(`Could not login user: ${error}`);
    }
  }
};