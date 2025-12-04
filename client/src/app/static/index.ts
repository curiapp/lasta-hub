
export const NQFLevel: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const programme_steps = {
  need_analysis: [
    {
      id: 1,
      title: "Programme Overview",
    },
    {
      id: 2,
      title: "Stakeholders' Consultation",
    },
    {
      id: 3,
      title: "PDQA Recommendation",
    },
    {
      id: 4,
      title: "BOS Consultation",
    },
    {
      id: 5,
      title: "APC Recommendation",
    },
    {
      id: 6,
      title: "Senate Approval",
    }
  ],
  programme_development: [
    {
      id: 1,
      title: "CDC and PAC Appointment",
    },
    {
      id: 2,
      title: "Curriculum Drafting",
    },
    {
      id: 3,
      title: "Draft Curriculum and PDQA Recomendation",
    }
  ],
  external_stakeholders_consultations: [
    {
      id: 1,
      title: "Circulation of Draft Programme",
    },
    {
      id: 2,
      title: "PAC Consultation and Benchmarking",
    },
    {
      id: 3,
      title: "Final Draft and PDQA Recommendations"
    }
  ],
  internal_stakeholders_consultations: [
    {
      id: 1,
      title: "Internal Consultations",
    },
    {
      id: 2,
      title: "ADSTLT Review",
    },
    {
      id: 3,
      title: "CEU Review"
    },
    {
      id: 4,
      title: "PDQA Recommendations"
    }
  ],
  bos_apc_senate_consultations: [
    {
      id: 1,
      title: "Final Draft to BOS Submission",
    },
    {
      id: 2,
      title: "Faculty BOS Consultation",
    },
    {
      id: 3,
      title: "APC Recommendation"
    },
    {
      id: 4,
      title: "Final Senate Recommendation"
    }
  ],
  nqf_registration: [
    {
      id: 1,
      title: "NQF Documentation",
    },
    {
      id: 2,
      title: "NQF Submission",
    },
    {
      id: 3,
      title: "NQF Feedback"
    },
    {
      id: 4,
      title: "NQF Registration"
    }
  ]
}

export const programmeNotifications = [
  {
    id: 1,
    name: 'Need Analysis',
    code: 'NA',
    date: '2025-01-12',
    description: 'Initial need analysis conducted to justify the development of the programme.'
  },
  {
    id: 2,
    name: 'Programme Development',
    code: 'PD',
    date: '2025-02-03',
    description: 'Programme structure, modules, outcomes and assessment plans drafted.'
  },
  {
    id: 3,
    name: 'External Stakeholders Consultations',
    code: 'EC',
    date: '2025-02-25',
    description: 'Consultations held with industry experts and external reviewers for programme relevance.'
  },
  {
    id: 4,
    name: 'Internal Stakeholders Consultations',
    code: 'IC',
    date: '2025-03-10',
    description: 'Feedback gathered from internal faculty, departments and academic offices.'
  },
  {
    id: 5,
    name: 'BOS, APC, Senate Consultations',
    code: 'BS',
    date: '2025-04-02',
    description: 'Programme submitted and reviewed through BOS, APC and Senate committees.'
  },
  {
    id: 6,
    name: 'NQF Registration',
    code: 'NR',
    date: '2025-05-16',
    description: 'Programme registered with NQF and approved for national accreditation.'
  }
];

export const programmeDevIcons = [
  // Planning & Development
  'assignment',           // Programme planning
  'timeline',             // Roadmap / stages
  'schema',               // Programme structure
  'task_alt',             // Task management
  'build_circle',         // Programme builder
  'edit',                 // Edit programme
  'account_tree',         // Academic structure

  // Quality Assurance (QA)
  'verified',             // QA checks
  'fact_check',           // Quality review
  'rule',                 // Validation
  'workspace_premium',    // Compliance
  'approval',             // Accreditation
  'tune',                 // Moderation
  'grading',              // Evaluation

  // Curriculum & Content
  'menu_book',            // Curriculum design
  'description',          // Module descriptors
  'center_focus_strong',  // Outcomes & learning goals
  'assignment_turned_in', // Assessment plan
  'library_books',        // Learning materials

  // Workflow & Processes
  'autorenew',            // Workflow steps
  'trending_up'           // Progress tracking
];


