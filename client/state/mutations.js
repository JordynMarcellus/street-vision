import { gql } from "apollo-boost";

export const REPORT_ENCOUNTER = gql`
  mutation VehicularEncounter($type: EncounterType!, $address: AddressInput!) {
    reportEncounter(encounter: { type: $type, address: $address }) {
      id
    }
  }
`;
