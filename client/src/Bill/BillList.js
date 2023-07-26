import React, { useEffect, useState } from "react";
import axios from "axios";

const BillList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8800/bills") // Tam URL'yi buraya girin
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
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">Bill List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Bill ID</th>
              <th className=" text-center">Customer ID</th>
              <th className=" text-center">Total Amount</th>
              <th className=" text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.product_id}>
                <td className=" text-center">{data.bill_id}</td>
                <td className=" text-center">{data.customer_id}</td>
                <td className=" text-center">{data.total_amount}</td>
                <td className=" text-center">{data.bill_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillList;
