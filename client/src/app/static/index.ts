import { TutorialStage } from "../types";

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
  // 'schema',               // Programme structure
  // 'task_alt',             // Task management
  // 'build_circle',         // Programme builder
  'edit',                 // Edit programme
  'account_tree',         // Academic structure

  // Quality Assurance (QA)
  'verified',             // QA checks
  'fact_check',           // Quality review
  // 'rule',                 // Validation
  'workspace_premium',    // Compliance
  'approval',             // Accreditation
  // 'tune',                 // Moderation
  'grading',              // Evaluation

  // Curriculum & Content
  'menu_book',            // Curriculum design
  // 'description',          // Module descriptors
  // 'center_focus_strong',  // Outcomes & learning goals
  'assignment_turned_in', // Assessment plan
  'library_books',        // Learning materials

  // Workflow & Processes
  'autorenew',            // Workflow steps
  // 'trending_up'           // Progress tracking
];



export const TUTORIAL_DATA: TutorialStage[] = [
  {
    "id": 1,
    "name": "Need Analysis",
    "description": "This stage captures the justification and foundational information for proposing a new programme. Users must complete all required steps and upload supporting documents through the submission modal before proceeding.",
    "processes": [
      {
        "id": 1,
        "name": "Programme Overview",
        "description": "Displays and captures general programme information such as programme name, qualification level, faculty, duration, mode of delivery, credit value, and NQF level.",
        "steps": [
          {
            "id": 1,
            "name": "Open Edit",
            "description": "Click on the 'Programme Overview' card to open and edit the programme details."
          },
          {
            "id": 2,
            "name": "Complete Required Fields",
            "description": "Fill in all mandatory fields including programme title, NQF level, total credits, duration, faculty, and mode of delivery."
          },
          {
            "id": 3,
            "name": "Upload Supporting Documents",
            "description": "Click 'Submit Documents' to open the upload modal. Attach all required supporting documents such as concept notes or preliminary approval letters, then submit."
          }
        ]
      },
      {
        "id": 2,
        "name": "Stakeholders' Consultation",
        "description": "The CDC provides relevant information and guidance for conducting stakeholder consultations to determine the need and relevance of the proposed programme.",
        "steps": [
          {
            "id": 1,
            "name": "Complete Consultation Details",
            "description": "Click on 'Stakeholders' Consultation' and fill in all required consultation details including stakeholder names, organisations, and feedback received."
          },
          {
            "id": 2,
            "name": "Add Stakeholders",
            "description": "Use the 'Add Stakeholder' button to include all consulted stakeholders. Ensure contact details and roles are correctly captured."
          },
          {
            "id": 3,
            "name": "Upload Consultation Documents",
            "description": "Open the document submission modal and upload supporting evidence such as meeting minutes, attendance registers, and feedback reports."
          },
          {
            "id": 4,
            "name": "Upload Survey or Questionnaire",
            "description": "Upload the survey instrument and/or final survey report summarising findings. Ensure the file is clearly labelled before submitting."
          }
        ]
      },
      {
        "id": 3,
        "name": "PDQA Recommendation",
        "description": "The Programme Development Quality Assurance (PDQA) committee reviews the completed Need Analysis report and makes a formal recommendation.",
        "steps": [
          {
            "id": 1,
            "name": "Upload Final Need Analysis Report",
            "description": "Open the submission modal and upload the final consolidated Need Analysis report for PDQA review."
          },
          {
            "id": 2,
            "name": "PDQA Decision",
            "description": "After review, PDQA will record a decision: Recommend, Approve, Defer, or Decline. The decision status will be visible in this section."
          },
          {
            "id": 3,
            "name": "Resubmit (If Required)",
            "description": "If the submission is deferred or requires corrections, revise the necessary documents and resubmit through the upload modal."
          },
          {
            "id": 4,
            "name": "Submit to BOS",
            "description": "If recommended or approved, enter the official submission date and formally submit the Need Analysis to the Board of Studies (BOS)."
          }
        ]
      }
    ]
  }
];

