import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3306/customers") // Tam URL'yi buraya girin
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        setError("There are no customers.");
        console.error("Error retrieving customers: ", error);
      });
  }, []);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4">Customer List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.customer_id}>
              {customer.customer_id} - {customer.name} - {customer.address} -{" "}
              {customer.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
