import axios from 'axios';
import { User, UserLoginPayload } from '../models';

export const loginUser = async (payload: UserLoginPayload): Promise<User> => {
  const response = await axios.post<User>('http://localhost:3333/user/login', payload);
  return response.data;
};