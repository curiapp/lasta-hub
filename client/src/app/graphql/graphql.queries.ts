import { gql } from "apollo-angular";

export const GET_PROGRAMMES = gql`
 query GetProgrammes{
  programmes{
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
