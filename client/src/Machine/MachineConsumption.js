import React, { useEffect, useState } from "react";
import axios from "axios";

const MachineConsumptionList = ({ machineID, submit, setSubmit }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (submit)
      axios
        .get(`http://localhost:8800/machine/${machineID}/consumptions`) // Makine kimliğini URL'ye ekleyin
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
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">
        Machine Consumption List
      </h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Machine ID</th>
              <th className=" text-center">Consumption ID</th>
              <th className=" text-center">Customer ID</th>
              <th className=" text-center">Quantity</th>{" "}
              <th className=" text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.machine_id}>
                <td className=" text-center">{data.machine_id}</td>
                <td className=" text-center">{data.consumption_id}</td>
                <td className=" text-center">{data.customer_id}</td>
                <td className=" text-center">{data.quantity}</td>
                <td className=" text-center">{data.consumption_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MachineConsumptionList;
