import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerMachinesList({ customerID, submit, setSubmit }) {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3306/customer/${customerID}/machines`
        );
        setMachines(response.data);
        setSubmit(false);
      } catch (error) {
        setSubmit(false);
        setError("Error retrieving machines.");
        console.error("Error retrieving machines: ", error);
      }
    };
    if (submit) {
      fetchMachines();
    }
  }, [customerID, submit]);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4">Customer Machines</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {machines.map((machine, index) => (
            <li key={index}>
              Machine ID: {machine.machine_id}, Type: {machine.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerMachinesList;
