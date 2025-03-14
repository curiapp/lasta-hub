export interface Programme {
  id: string;
  code: string;
  level: number;
  title: string;
  faculty: string;
  members: string[];
  createdDate: string;
  description: string;
  lastReviewDate: string;
  actions: string[];
  stage: "Active" | "Pending Review" | "Inactive" | "Completed" | string;
}

export type ProgrammeList = Programme[];
