export interface Programme {
  id: string;
  faculty: string;
  programme: string;
  createdDate: string;
  lastReviewDate: string;
  stage: "Active" | "Pending Review" | "Inactive"| "Completed" | string;
  members: string[];
  description: string;
  actions: string[];
}

export type ProgrammeList = Programme[];
