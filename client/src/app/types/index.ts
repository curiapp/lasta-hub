export interface Programme {
  id?: string;
  code: string;
  level: number;
  name: string;
  faculty: string;
  members?: string[];
  initiator?: string;
  createdDate?: string;
  description?: string;
  lastReviewDate?: string;
  actions?: string[];
  department?: string;
  preProgComponent?: {
    devCode: string;
    initiator: string;
  };
  isPreProgramme?: boolean;
  stage?: "Active" | "Pending Review" | "Inactive" | "Completed" | string;
}

export type ProgrammeList = Programme[];

export type NQFLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type User = {
  id?: string;
  username: string;
  profile: string;
  firstname: string,
  lastname: string,
  usrUnit?: {
    faculty: string,
    department: string,
    type: string
  },
  emailAddress: string,
  token?: string,
  expires?: number
}
