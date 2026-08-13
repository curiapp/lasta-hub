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
  responsiblePerson?: string;
  responsibleUnit?: string;
  processedYear?: number;
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
  responsiblePerson?: string;
  responsibleUnit?: string;
  defermentReason?: string;
  completedAt?: string;
};

export type ReportTaskTracking = {
  id: string;
  programmeId: string;
  programmeTitle: string;
  programmeCode: string;
  taskName: string;
  stage: string;
  status: string;
  decision: string;
  responsiblePerson?: string;
  responsibleUnit?: string;
  date?: string;
  completedAt?: string;
  defermentReason?: string;
};

export type ReportDeferment = {
  id: string;
  programmeId: string;
  programmeTitle: string;
  programmeCode: string;
  taskName: string;
  stage: string;
  decision: string;
  reason: string;
  date?: string;
  responsiblePerson?: string;
  responsibleUnit?: string;
};

export type ReportBreakdownItem = {
  label: string;
  count: number;
};

export type ReportsReviewsData = {
  summary: {
    programmeCount: number;
    runningCount: number;
    completedCount: number;
    reviewCount: number;
    defermentCount: number;
  };
  processedByYear: ReportBreakdownItem[];
  breakdowns: {
    status: ReportBreakdownItem[];
    stage: ReportBreakdownItem[];
    decision: ReportBreakdownItem[];
  };
  programmes: ReportProgramme[];
  taskTracking: ReportTaskTracking[];
  deferments: ReportDeferment[];
  reviews: CompletedReview[];
};
