import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerConsumptionsList({ customerID, submit, setSubmit }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConsumptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/customer/${customerID}/consumptions`
        );
        setData(response.data);
        setSubmit(false);
      } catch (error) {
        setSubmit(false);

        setError("There are no retrieving data.");
        console.error("Error retrieving data: ", error);
      }
    };
    if (submit) {
      console.log("girdi");
      fetchConsumptions();
    }
  }, [customerID, submit]);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">
        Customer Consumptions
      </h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Consumption ID</th>
              <th className=" text-center">Machine ID</th>
              <th className=" text-center">Quantity</th>
              <th className=" text-center">Product Name</th>
              <th className=" text-center">Product ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.consumption_id}>
                <td className=" text-center">{data.consumption_id}</td>
                <td className=" text-center">{data.machine_id}</td>
                <td className=" text-center">{data.quantity}</td>
                <td className=" text-center">{data.name}</td>
                <td className=" text-center">{data.product_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerConsumptionsList;
