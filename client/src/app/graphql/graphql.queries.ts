import { gql } from "apollo-angular";

export const GET_WORKFLOW_DEFINITION = gql`
  query GetWorkflowDefinition { workflowDefinition }
`;

export const GET_BOOTSTRAP = gql`
  query GetBootstrap { bootstrap }
`;

export const GET_PROGRAMMES = gql`
  query GetProgrammes($id: String, $searchText: String, $offset: Int = 0, $limit: Int = 50) {
    programmes(id: $id, searchText: $searchText, offset: $offset, limit: $limit) {
      id code title level status faculty facultyName department departmentName
      initiator coordinators advisories createdAt
    }
  }
`;

export const GET_PROGRAMME_WORKFLOW = gql`
  query GetProgrammeWorkflow($programmeId: ID!) {
    programmeWorkflow(programmeId: $programmeId)
  }
`;

export const GET_ACTIVE_TASKS = gql`
  query GetActiveTasks($role: String) {
    tasks(role: $role) {
      task {
        id processId programmeId taskKey stageKey name status ownerRoles formData
        decision transitionLabel causedByTaskId completedBy createdAt completedAt
      }
      programme {
        id code title level status faculty facultyName department departmentName initiator createdAt
      }
    }
  }
`;

export const CREATE_PROGRAMME = gql`
  mutation CreateProgramme($input: CreateProgrammeInput!) {
    createProgramme(input: $input)
  }
`;

export const START_PROCESS = gql`
  mutation StartProcess($programmeId: ID!, $actorId: ID, $workflowSlug: String) {
    startProcess(programmeId: $programmeId, actorId: $actorId, workflowSlug: $workflowSlug)
  }
`;

export const COMPLETE_TASK = gql`
  mutation CompleteTask($taskId: ID!, $input: JSON!) {
    completeTask(taskId: $taskId, input: $input)
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: String) {
    notifications(userId: $userId) {
      id title message type referenceId createdAt isRead programmeName
    }
  }
`;

export const PUBLISH_WORKFLOW_DEFINITION = gql`
  mutation PublishWorkflowDefinition($definition: JSON!, $actorId: ID) {
    publishWorkflowDefinition(definition: $definition, actorId: $actorId)
  }
`;
