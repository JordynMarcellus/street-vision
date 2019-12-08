import React, { useState } from "react";
import Head from "next/head";
import withData from "../lib/withData";
import { useQuery } from "@apollo/react-hooks";
import { Form } from "../components/Form";
import * as queries from "../state/queries";

const Home = props => {
  const { loading, error, data } = useQuery(queries.GET_REPORT_TYPES);
  return (
    <div>
      <Head>
        <title>Casual vehicular encounters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && <Form options={data.__type.enumValues} />}
      <p>
        Hi! We use your device's geo-address for all vehicle reports. Please
        select yes when the notifcation appears!
      </p>
    </div>
  );
};

export default withData(Home);
