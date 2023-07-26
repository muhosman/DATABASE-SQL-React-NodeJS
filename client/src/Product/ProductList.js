import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8800/products") // Tam URL'yi buraya girin
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
      <h2 className=" border-b-2 mb-4 text-xl font-bold ">Product List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <table className=" w-full">
          <thead>
            <tr>
              <th className=" text-center">Product ID</th>
              <th className=" text-center">Name</th>
              <th className=" text-center">Price</th>
              <th className=" text-center">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.product_id}>
                <td className=" text-center">{data.product_id}</td>
                <td className=" text-center">{data.name}</td>
                <td className=" text-center">{data.price}</td>
                <td className=" text-center">{data.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
