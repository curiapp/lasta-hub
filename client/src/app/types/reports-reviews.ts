export type ReportProgramme = {
  id: string;
  title: string;
  code: string;
  level: number;
  status: string;
  facultyName?: string;
  departmentName?: string;
  workflowStatus: string;
  currentStage?: string;
  activeTasks: number;
  completedTasks: number;
  evidenceCount: number;
  lastActivity: string;
};

export type CompletedReview = {
  id: string;
  programmeId: string;
  programmeTitle: string;
  programmeCode: string;
  taskName: string;
  stage: string;
  decision: string;
  completedAt?: string;
};

export type ReportsReviewsData = {
  summary: {
    programmeCount: number;
    runningCount: number;
    completedCount: number;
    reviewCount: number;
  };
  programmes: ReportProgramme[];
  reviews: CompletedReview[];
};
