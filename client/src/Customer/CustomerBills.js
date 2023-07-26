import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerBillsList({ customerID, submit, setSubmit }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/customer/${customerID}/bills`
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
      fetchBills();
    }
  }, [customerID, submit]);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">BCustomer Bills</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Bill ID</th>
              <th className=" text-center">Total Amount</th>
              <th className=" text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.product_id}>
                <td className=" text-center">{data.bill_id}</td>
                <td className=" text-center">{data.total_amount}</td>
                <td className=" text-center">{data.bill_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerBillsList;
