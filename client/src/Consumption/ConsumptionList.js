import React, { useEffect, useState } from "react";
import axios from "axios";

const ConsumptionList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8800/consumptions") // Tam URL'yi buraya girin
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError("There are no data.");
        console.error("Error retrieving data: ", error);
      });
  }, []);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">Consumption List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Consumption ID</th>
              <th className=" text-center">Quantity</th>
              <th className=" text-center">Machine ID</th>
              <th className=" text-center">Product ID</th>
              <th className=" text-center">Customer ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.product_id}>
                <td className=" text-center">{data.consumption_id}</td>
                <td className=" text-center">{data.quantity}</td>
                <td className=" text-center">{data.machine_id}</td>
                <td className=" text-center">{data.product_id}</td>
                <td className=" text-center">{data.customer_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsumptionList;
