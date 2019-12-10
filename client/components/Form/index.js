import React, { useState } from "react";
import * as FormStyles from "./styles";
import * as mutations from "../../state/mutations";
import { usePosition } from "../../state/usePosition";
import { useMutation } from "@apollo/react-hooks";

export const Form = ({ options }) => {
  const [
    reportEncounterFn,
    { error: mutationError, data: mutationData },
  ] = useMutation(mutations.REPORT_ENCOUNTER);
  const [reportState, setReportState] = useState({
    type: "RUN_RED",
  });

  return (
    <FormStyles.Container
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
      <FormStyles.StyledSelect
        onChange={e => setReportState({ type: e.target.value })}
        value={reportState.type}>
        {options.map(({ name }, index) => {
          return (
            <option key={`${name}--${index}`} value={name}>
              {name}
            </option>
          );
        })}
      </FormStyles.StyledSelect>
      <FormStyles.Button>Click to report</FormStyles.Button>
    </FormStyles.Container>
  );
};
