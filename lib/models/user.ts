export interface IUser {
  id: string;
  email: string;
  password: string;
}

export type LoginPayload = Omit<IUser, 'id'>;