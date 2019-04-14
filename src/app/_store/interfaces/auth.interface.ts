export interface IAuthStore {
  authenticated: boolean;
  user: IUser;
  message?: string;
}

export interface IUser {
  _id: string;
  email: string;
  statusId: number;
}
