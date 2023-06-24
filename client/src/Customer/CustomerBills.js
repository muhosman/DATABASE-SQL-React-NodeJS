import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerBillsList({ customerID, submit, setSubmit }) {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3306/customer/${customerID}/bills`
        );
        setBills(response.data);
        setSubmit(false);
      } catch (error) {
        setSubmit(false);
        setError("Error retrieving bills.");
        console.error("Error retrieving bills: ", error);
      }
    };
    if (submit) {
      fetchBills();
    }
  }, [customerID, submit]);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4">Customer Bills</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {bills.map((bill, index) => (
            <li key={index}>
              Bill ID: {bill.bill_id}, Amount: {bill.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerBillsList;
