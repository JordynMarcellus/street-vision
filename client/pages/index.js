import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import withData from "../lib/withData";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_ENCOUNTERS = gql`
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

const Home = props => {
  const { loading, error, data } = useQuery(GET_ENCOUNTERS);
  return (
    <div>
      <Head>
        <title>Casual vehicular encounters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default withData(Home);
