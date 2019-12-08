export const Form = ({ options }) => {
  const [
    reportEncounterFn,
    { error: mutationError, data: mutationData },
  ] = useMutation(mmutations.REPORT_ENCOUNTER);
  const { lat, lng, error: geoError } = usePosition();
  const [reportState, setReportState] = useState({
    type: "RUN_RED",
  });

  return (
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
      <button>Click to report</button>
    </form>
  );
};
