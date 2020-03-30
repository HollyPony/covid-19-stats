import React from "react";

import { ApiContext } from "react-rest-api";
import { Form } from "react-bootstrap";
import Select from "react-select";

const CountrySelector = ({ setCountry }) => {
  const api = React.useContext(ApiContext);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [countries, setCountries] = React.useState();

  React.useEffect(() => {
    api
      .get("countries")
      .then(setCountries)
      .catch(setError)
      .then(() => setLoading(false));
  }, [api, setLoading, setError, setCountries]);

  if (loading) {
    // TODO: tr
    return <span>chargement</span>;
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <fieldset>
      <Form.Group>
        {/* TODO: tr */}
        <Form.Label>Pays</Form.Label>
        <Select
          onChange={setCountry}
          options={countries
            .filter(country => country.Slug)
            .map(country => ({
              value: country.Slug,
              label: country.Country
            }))}
        />
      </Form.Group>
    </fieldset>
  );
};

export default CountrySelector;
