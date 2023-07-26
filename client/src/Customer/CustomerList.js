import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8800/customers") // Tam URL'yi buraya girin
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
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">Customer List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Customer ID</th>
              <th className=" text-center">Name</th>
              <th className=" text-center">Address</th>
              <th className=" text-center">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td className=" text-center">{customer.customer_id}</td>
                <td className=" text-center">{customer.name}</td>
                <td className=" text-center">{customer.address}</td>
                <td className=" text-center">{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
