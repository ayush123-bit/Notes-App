export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  provider?: "email" | "google";
  createdAt?: string;
  updatedAt?: string;
}

export interface INote {
  _id?: string;
  title: string;
  content?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}
