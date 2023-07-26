import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerMachinesList({ customerID, submit, setSubmit }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/customer/${customerID}/machines`
        );
        setData(response.data);
        setSubmit(false);
      } catch (error) {
        setSubmit(false);
        setError("Error retrieving data.");
        console.error("Error retrieving data: ", error);
      }
    };
    if (submit) {
      fetchMachines();
    }
  }, [customerID, submit]);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">Customer Machines</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Machine ID</th>
              <th className=" text-center">Quote</th>
              <th className=" text-center">Counter</th>
              <th className=" text-center">Address</th>
              <th className=" text-center">Product ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.product_id}>
                <td className=" text-center">{data.machine_id}</td>
                <td className=" text-center">{data.quote}</td>
                <td className=" text-center">{data.counter}</td>
                <td className=" text-center">{data.address}</td>
                <td className=" text-center">{data.product_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerMachinesList;
