import { gql } from "apollo-angular";

export const GET_PROGRAMMES = gql`
 query GetProgrammes{
  programmes{
      id
      code
      title
      level
      faculty
      department
      initiator
    }
  }
`;

export const GET_PROGRAMME_BY_ID = gql`
  query GetProgramme($id: String!) {
    programmes(id: $id){
      id
      code
      title
      level
      faculty
      department
      initiator
    }
  }
`;
