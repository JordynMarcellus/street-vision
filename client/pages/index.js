import React, { useState } from "react";
import Head from "next/head";
import withData from "../lib/withData";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { usePosition } from "../state/usePosition";

const REPORT_ENCOUNTER = gql`
  mutation reportEncounter($type: EncounterType!, $address: AddressInput!) {
    reportEncounter(encounter: { type: $type, address: $address }) {
      id
    }
  }
`;

const GET_ENCOUNTERS = gql`
  # query AllEncounters {
  #   encounters {
  #     id
  #     type
  #     address {
  #       geoLocation {
  #         lat
  #         lng
  #       }
  #       readable
  #     }
  #     reportedOn
  #   }
  # }
  query GetReportEnums {
    __type(name: "EncounterType") {
      name
      enumValues {
        name
      }
    }
  }
`;

const Home = props => {
  const { loading, error, data } = useQuery(GET_ENCOUNTERS);
  const [reportEncounterFn, otherStuff] = useMutation(REPORT_ENCOUNTER);
  const { lat, lng, error: geoError } = usePosition();
  const [reportState, setReportState] = useState({
    type: "",
  });
  console.log(lat, lng);
  console.log(otherStuff);
  return (
    <div>
      <Head>
        <title>Casual vehicular encounters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && (
        <form
          onSubmit={e => {
            e.preventDefault();
            reportEncounterFn({
              variables: {
                type: reportState.type,
                address: {
                  lat,
                  lng,
                },
              },
            });
          }}>
          <select onChange={e => setReportState({ type: e.target.value })}>
            {data.__type.enumValues.map(({ name }, index) => (
              <option key={`${name}--${index}`} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button onClick={reportEncounterFn}>Click to report</button>
        </form>
      )}
      <p>
        Hi! We use your device's geo-address for all vehicle reports. Please
        select yes when the notifcation appears!
      </p>
    </div>
  );
};

export default withData(Home);
