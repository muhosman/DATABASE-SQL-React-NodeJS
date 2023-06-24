import React, { useEffect, useState } from "react";
import axios from "axios";

const MachineList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3306/machines") // Tam URL'yi buraya girin
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
      <h2 className=" border-b-2 mb-4">Machine List</h2>
      {error !== "" ? (
        <div>{error}</div>
      ) : (
        <ul>
          {data.map((data) => (
            <li key={data.machine_id}>
              {data.machine_id} - {data.quote}- {data.counter} - {data.address}-{" "}
              {data.product_id} - {data.customer_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MachineList;
