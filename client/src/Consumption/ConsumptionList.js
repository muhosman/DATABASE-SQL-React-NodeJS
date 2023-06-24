import React, { useEffect, useState } from "react";
import axios from "axios";

const ConsumptionList = () => {
  const [consumptions, setConsumptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8800/consumptions") // Tam URL'yi buraya girin
      .then((response) => {
        setConsumptions(response.data);
      })
      .catch((error) => {
        setError("There are no consumptions.");
        console.error("Error retrieving consumptions: ", error);
      });
  }, []);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4">Consumption List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {consumptions.map((consumption) => (
            <li key={consumption.consumption_id}>
              {consumption.machine_id} - {consumption.product_id} -
              {consumption.quantity} - {consumption.customer_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsumptionList;
