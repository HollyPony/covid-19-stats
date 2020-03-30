import React from "react";

import { ApiContext } from "react-rest-api";
import { Chart as RChart } from "react-charts";

const Chart = ({ country, status }) => {
  const api = React.useContext(ApiContext);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    if (!country || !status) {
      return;
    }
    api
      .get(`total/dayone/country/${country.value}/status/${status.value}`)
      .then(response => {
        const data = response.map(dat => [new Date(dat.Date), dat.Cases]);
        console.log("response", data);
        setData([{ label: "test", data }]);
      })
      .catch(setError)
      .then(() => setLoading(false));
  }, [api, country, status, setLoading, setError, setData]);

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  if (loading) {
    // TODO: tr
    return <span>chargement du graph ...</span>;
  }

  console.log("error", error);

  if (error) {
    return <pre>err: {JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <RChart
      style={{
        width: "400px",
        height: "300px"
      }}
      data={data}
      axes={axes}
    />
  );
};

export default Chart;
