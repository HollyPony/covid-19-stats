import React from "react";

import { Form } from "react-bootstrap";
import Select from "react-select";

const StatusSelector = ({ setStatus }) => (
  <fieldset>
    <Form.Group>
      {/* TODO: tr */}
      <Form.Label>Status</Form.Label>
      <Select
        onChange={setStatus}
        options={[
          { label: "Confirmés", value: "confirmed" },
          { label: "Retablis", value: "recovered" },
          { label: "Morts", value: "deaths" }
        ]}
      />
    </Form.Group>
  </fieldset>
);

export default StatusSelector;
