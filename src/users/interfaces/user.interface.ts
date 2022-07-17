export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IUserNotPass {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}