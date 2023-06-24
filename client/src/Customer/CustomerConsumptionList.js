import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerConsumptionsList({ customerID, submit, setSubmit }) {
  const [consumptions, setConsumptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConsumptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3306/customer/${customerID}/consumptions`
        );
        setConsumptions(response.data);
        setSubmit(false);
      } catch (error) {
        setSubmit(false);

        setError("There are no retrieving consumptions.");
        console.error("Error retrieving consumptions: ", error);
      }
    };
    if (submit) {
      console.log("girdi");
      fetchConsumptions();
    }
  }, [customerID, submit]);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4">Customer Consumptions</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {consumptions.map((consumption, index) => (
            <li key={index}>
              {consumption.customer_id} - {consumption.consumption_id} -{" "}
              {consumption.machine_id} - {consumption.product_id} -{" "}
              {consumption.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerConsumptionsList;
