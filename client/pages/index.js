import React, { useState } from "react";
import Head from "next/head";
import withData from "../lib/withData";
import { useQuery } from "@apollo/react-hooks";
import { Form } from "../components/Form";
import * as queries from "../state/queries";
import { usePosition } from "../state/usePosition";

const Home = props => {
  const { loading, error: queryError, data } = useQuery(
    queries.GET_REPORT_TYPES
  );
  const { lat, lng, getPosition, error: geoError } = usePosition();
  console.log(lat, lng);

  return (
    <div>
      <Head>
        <title>Casual vehicular encounters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && <Form options={data.__type.enumValues} />}
      <button onClick={getPosition}>Report encounter</button>
      <p>
        Hi! We use your device's geo-address for all vehicle reports. Please
        select yes when the notifcation appears!
      </p>
    </div>
  );
};

export default withData(Home);
