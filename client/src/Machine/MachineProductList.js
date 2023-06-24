import React, { useEffect, useState } from "react";
import axios from "axios";

const MachineProductList = ({ machineID, submit, setSubmit }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (submit)
      axios
        .get(`http://localhost:3306/machine/${machineID}/products`) // Makine kimliğini URL'ye ekleyin
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
    <div className="p-4">
      <h2 className="border-b-2 mb-4">Machine List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {data.map((product) => (
            <li key={product.product_id}>
              {product.product_id} - {product.product_name} - {product.price} -{" "}
              {product.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MachineProductList;
