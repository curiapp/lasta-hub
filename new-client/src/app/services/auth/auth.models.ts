export interface IUser{
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  role: string;
  updated: Date;
  verified: boolean;
  faculty: string;
  department: string;
  title: string;
}

export interface ISignCredentials {
  email: string;
  password: string;
}
