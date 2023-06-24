import React, { useEffect, useState } from "react";
import axios from "axios";

const MachineConsumptionList = ({ machineID, submit, setSubmit }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (submit)
      axios
        .get(`http://localhost:3306/machine/${machineID}/consumptions`) // Makine kimliğini URL'ye ekleyin
        .then((response) => {
          setData(response.data);
          setSubmit(false);
        })
        .catch((error) => {
          setSubmit(false);

          setError("There are no data.");
          console.error("Error retrieving data: ", error);
        });
  }, [machineID, submit]);

  return (
    <div className="p-4">
      <h2 className="border-b-2 mb-4">Machine List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {data.map((consumption) => (
            <li key={consumption.customer_id}>
              {consumption.machine_id} - {consumption.customer_id} -{" "}
              {consumption.product_id} - {consumption.consumption_id} -{" "}
              {consumption.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MachineConsumptionList;
