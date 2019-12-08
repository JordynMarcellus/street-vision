import React, { useState } from "react";
import Head from "next/head";
import withData from "../lib/withData";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as queries from "../state/queries";
import * as mmutations from "../state/mutations";
import { usePosition } from "../state/usePosition";

// const UPDATE_TODO = gql`
//   mutation UpdateTodo($id: String!, $type: String!) {
//     updateTodo(id: $id, type: $type) {
//       id
//       type
//     }
//   }
// `;

const Home = props => {
  const { loading, error, data } = useQuery(queries.GET_REPORT_TYPES);
  const [
    reportEncounterFn,
    { error: mutationError, data: mutationData },
  ] = useMutation(mmutations.REPORT_ENCOUNTER);
  const { lat, lng, error: geoError } = usePosition();
  const [reportState, setReportState] = useState({
    type: "RUN_RED",
  });
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
            const variables = {
              type: reportState.type,
              address: {
                lat,
                lng,
              },
            };
            reportEncounterFn({
              variables,
            });
          }}>
          <select
            onChange={e => setReportState({ type: e.target.value })}
            value={reportState.type}>
            {data.__type.enumValues.map(({ name }, index) => {
              return (
                <option key={`${name}--${index}`} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          <button type="submit">Click to report</button>
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
