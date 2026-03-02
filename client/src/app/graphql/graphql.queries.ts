import { gql } from "apollo-angular";

export const GET_PROGRAMMES = gql`
 query GetProgrammes($searchText: String!, $offset: Int, $limit: Int){
  programmes(searchText: $searchText, offset: $offset, limit: $limit){
      code
      department
      faculty
      id
      initiator
      level
      title
      initiatorFirstName
      initiatorLastName
    }
  }
`;

export const GET_PROGRAMME_BY_ID = gql`
  query GetProgramme($id: String!) {
    programmes(id: $id){
      code
      department
      faculty
      id
      initiator
      level
      title
      initiatorFirstName
      initiatorLastName
    }
  }
`;

export const GET_PROGRAMME_PHASE_BY_ID = gql`
  query GetProgrammePhase($programmeId: String!, $phaseSlug: String!) {
    programme_phase_step(phaseSlug: $phaseSlug, programmeId: $programmeId)
  }
`;

export const GET_EVENTS_BY_DATE = gql`
  query GetEventsByDate($date: String!) {
    events(date: $date) {
      id
      date
      title
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: String!) {
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
` ;
