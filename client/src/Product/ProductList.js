import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [product, setBill] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3306/products") // Tam URL'yi buraya girin
      .then((response) => {
        setBill(response.data);
      })
      .catch((error) => {
        setError("There are no product.");
        console.error("Error retrieving product: ", error);
      });
  }, []);

  return (
    <div className=" p-4">
      <h2 className=" border-b-2 mb-4">Product List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {product.map((product) => (
            <li key={product.product_id}>
              {product.product_id} - {product.name}- {product.price}-{" "}
              {product.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
