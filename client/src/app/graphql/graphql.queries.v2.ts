import { gql } from "apollo-angular";

export const V2_GET_WORKFLOW_DEFINITION = gql`
  query V2GetWorkflowDefinition {
    workflowDefinition
  }
`;

export const V2_GET_BOOTSTRAP = gql`
  query V2GetBootstrap {
    bootstrap
  }
`;

export const V2_GET_PROGRAMMES = gql`
  query V2GetProgrammes(
    $id: String
    $searchText: String
    $offset: Int = 0
    $limit: Int = 50
  ) {
    programmes(
      id: $id
      searchText: $searchText
      offset: $offset
      limit: $limit
    ) {
      id
      code
      title
      level
      status
      faculty
      facultyName
      department
      departmentName
      initiator
      coordinators
      advisories
      createdAt
    }
  }
`;

export const V2_GET_PROGRAMME_WORKFLOW = gql`
  query V2GetProgrammeWorkflow($programmeId: ID!) {
    programmeWorkflow(programmeId: $programmeId)
  }
`;

export const V2_GET_ACTIVE_TASKS = gql`
  query V2GetActiveTasks($role: String) {
    tasks(role: $role) {
      task {
        id
        processId
        programmeId
        taskKey
        stageKey
        name
        status
        ownerRoles
        formData
        decision
        transitionLabel
        causedByTaskId
        completedBy
        createdAt
        completedAt
      }
      programme {
        id
        code
        title
        level
        status
        faculty
        facultyName
        department
        departmentName
        initiator
        createdAt
      }
    }
  }
`;

export const V2_CREATE_PROGRAMME = gql`
  mutation V2CreateProgramme($input: CreateProgrammeInput!) {
    createProgramme(input: $input)
  }
`;

export const V2_START_PROCESS = gql`
  mutation V2StartProcess(
    $programmeId: ID!
    $actorId: ID
    $workflowSlug: String
  ) {
    startProcess(
      programmeId: $programmeId
      actorId: $actorId
      workflowSlug: $workflowSlug
    )
  }
`;

export const V2_COMPLETE_TASK = gql`
  mutation V2CompleteTask($taskId: ID!, $input: JSON!) {
    completeTask(taskId: $taskId, input: $input)
  }
`;

export const V2_GET_NOTIFICATIONS = gql`
  query V2GetNotifications($userId: String) {
    notifications(userId: $userId) {
      id
      title
      message
      type
      referenceId
      createdAt
      isRead
      programmeName
    }
  }
`;

export const V2_PUBLISH_WORKFLOW_DEFINITION = gql`
  mutation V2PublishWorkflowDefinition($definition: JSON!, $actorId: ID) {
    publishWorkflowDefinition(
      definition: $definition
      actorId: $actorId
    )
  }
`;
