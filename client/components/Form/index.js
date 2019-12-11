import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import * as FormStyles from "./styles";
import * as mutations from "../../state/mutations";
import { usePosition } from "../../state/usePosition";
export const Form = ({ options }) => {
  const [reportState, setReportState] = useState({
    type: "RUN_RED",
  });
  const [
    reportEncounterFn,
    { error: mutationError, data: mutationData },
  ] = useMutation(mutations.REPORT_ENCOUNTER);
  const { lat, lng, error, getPosition } = usePosition();
  const isDisabled = lat === null && lng === null;
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
      <FormStyles.Button disabled={isDisabled}>
        Click to report
      </FormStyles.Button>
      <FormStyles.Button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          getPosition();
        }}>
        Get device's location
      </FormStyles.Button>
    </FormStyles.Container>
  );
};
