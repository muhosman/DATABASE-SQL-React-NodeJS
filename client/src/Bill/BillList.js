import React, { useEffect, useState } from "react";
import axios from "axios";

const BillList = () => {
  const [bill, setBill] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8800/bills") // Tam URL'yi buraya girin
      .then((response) => {
        setBill(response.data);
      })
      .catch((error) => {
        setError("There are no bill.");
        console.error("Error retrieving bill: ", error);
      });
  }, []);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4">Bill List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {bill.map((bill) => (
            <li key={bill.bill_id}>
              {bill.bill_id} - {bill.total_amount} - {bill.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BillList;
