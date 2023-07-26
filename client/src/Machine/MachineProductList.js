import React, { useEffect, useState } from "react";
import axios from "axios";

const MachineProductList = ({ machineID, submit, setSubmit }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (submit)
      axios
        .get(`http://localhost:8800/machine/${machineID}/products`) // Makine kimliğini URL'ye ekleyin
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
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">
        Machine Product List
      </h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Product ID</th>
              <th className=" text-center">Name</th>
              <th className=" text-center">Description</th>
              <th className=" text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.product_id}>
                <td className=" text-center">{data.product_id}</td>
                <td className=" text-center">{data.name}</td>
                <td className=" text-center">{data.description}</td>
                <td className=" text-center">{data.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MachineProductList;
