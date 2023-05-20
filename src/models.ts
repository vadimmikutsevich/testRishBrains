export interface User {
  id: number;
  login: string;
  password: string;
}

export interface Client {
  id: string;
  name: string;
  surname: string;
  age: string;
  phone: string;
  country: string;
}

export interface UserLoginPayload {
  login: string;
  password: string;
}