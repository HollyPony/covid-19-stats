import React from "react";
import { ApiProvider } from "react-rest-api";
import { Container, Navbar } from "react-bootstrap";

const CountrySelector = React.lazy(() => import("./CountrySelector"));
const StatusSelector = React.lazy(() => import("./StatusSelector"));
const Chart = React.lazy(() => import("./Chart"));

export default function App() {
  const [country, setCountry] = React.useState();
  const [status, setStatus] = React.useState();
  const apiConfig = React.useMemo(
    () => ({
      url: "https://api.covid19api.com/",
      resolveCallback: response => response.json()
    }),
    []
  );

  return (
    <ApiProvider {...apiConfig}>
      <Container fluid>
        <Navbar>
          <Navbar.Brand href="/">Covid stats</Navbar.Brand>
        </Navbar>

        <React.Suspense fallback={<span>loading ...</span>}>
          <CountrySelector setCountry={setCountry} />
          <StatusSelector setStatus={setStatus} />
          <Chart country={country} status={status} />
        </React.Suspense>
      </Container>
    </ApiProvider>
  );
}
