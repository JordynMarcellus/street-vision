import { gql } from "apollo-boost";

export const GET_ENCOUNTERS = gql`
  query AllEncounters {
    encounters {
      id
      type
      address {
        geoLocation {
          lat
          lng
        }
        readable
      }
      reportedOn
    }
  }
`;

export const GET_REPORT_TYPES = gql`
  query GetReportEnums {
    __type(name: "EncounterType") {
      name
      enumValues {
        name
      }
    }
  }
`;
