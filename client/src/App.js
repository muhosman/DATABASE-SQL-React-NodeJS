import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import CustomerConsumptionsList from "./Customer/CustomerConsumptionList";
import CustomerList from "./Customer/CustomerList";
import axios from "axios";
import CustomerBillsList from "./Customer/CustomerBills";
import CustomerMachinesList from "./Customer/CustomerMachines";
import BillList from "./Bill/BillList";
import ConsumptionList from "./Consumption/ConsumptionList";
import ProductList from "./Product/ProductList";
import MachineList from "./Machine/MachineList";
import MachineProductList from "./Machine/MachineProductList";
import MachineConsumptionList from "./Machine/MachineConsumption";

function App() {
  const [select, setSelect] = useState(0);
  const [submit, setSubmit] = useState(false);

  const [deleteCustomer, setDeleteCustomer] = useState(false);
  const [getCustomer, setGetCustomer] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [getCustomerConsumption, setGetCustomerConsumption] = useState(false);
  const [getCustomerBill, setGetCustomerBill] = useState(false);
  const [getCustomerMachine, setGetCustomerMachine] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [getBill, setGetBill] = useState(false);
  const [addBill, setAddBill] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");

  const [getConsumption, setGetConsumpiton] = useState(false);
  const [addConsumpiton, setAddConsumption] = useState("");

  const [deleteProduct, setDeleteProduct] = useState(false);
  const [getProduct, setGetProduct] = useState(false);
  const [addProduct, setAddProduct] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [getMachine, setGetMachine] = useState(false);
  const [getMachineProduct, setGetMachineProduct] = useState(false);
  const [getMachineConsumptions, setGetMachineConsumptions] = useState(false);

  const [addMachine, setAddMachine] = useState(false);
  const [assignMachine, setAssignMachine] = useState(false);

  const [machineId, setMachineId] = useState("");
  const [machineQuote, setMachineQuote] = useState("");
  const [machineCounter, setMachineCounter] = useState("");

  const [machineAddress, setMachineAddress] = useState("");

  const [quantity, setQuantity] = useState("");

  const handleChange = (event) => {
    setCustomerId(event.target.value);
  };
  const handleChangeMachineCounter = (event) => {
    setMachineCounter(event.target.value);
  };
  const handleChangeMachineAddress = (event) => {
    setMachineAddress(event.target.value);
  };
  const handleChangeMachineQuote = (event) => {
    setMachineQuote(event.target.value);
  };
  const handleChangeMachineId = (event) => {
    setMachineId(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handleChangeTotalAmount = (event) => {
    setTotalAmount(event.target.value);
  };
  const handleChangeProductId = (event) => {
    setProductId(event.target.value);
  };
  const handleChangeProductName = (event) => {
    setProductName(event.target.value);
  };
  const handleChangeProductPrice = (event) => {
    setProductPrice(event.target.value);
  };
  const handleChangeProductDescription = (event) => {
    setProductDescription(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (event.target.id !== "button-getCustomerConsumptions") {
      setGetCustomerConsumption(false);
    }
    if (event.target.id !== "button-getCustomer") {
      setGetCustomer(false);
    }
    if (event.target.id !== "button-addCustomer") {
      setAddCustomer(false);
    }
    if (event.target.id !== "button-getCustomerBill") {
      setGetCustomerBill(false);
    }
    if (event.target.id !== "button-getCustomerMachine") {
      setGetCustomerMachine(false);
    }
    if (event.target.id !== "button-getBill") {
      setGetBill(false);
    }
    if (event.target.id !== "button-addBill") {
      setAddBill(false);
    }
    if (event.target.id !== "button-getConsumption") {
      setGetConsumpiton(false);
    }
    if (event.target.id !== "button-addConsumption") {
      setAddConsumption(false);
    }
    if (event.target.id !== "button-getProduct") {
      setGetProduct(false);
    }
    if (event.target.id !== "button-addProduct") {
      setAddProduct(false);
    }
    if (event.target.id !== "button-getMachine") {
      setGetMachine(false);
    }
    if (event.target.id !== "button-addMachine") {
      setAddMachine(false);
    }
    if (event.target.id !== "button-assignMachine") {
      setAssignMachine(false);
    }
    if (event.target.id !== "button-getMachineProduct") {
      setGetMachineProduct(false);
    }
    if (event.target.id !== "button-getMachineConsumptions") {
      setGetMachineConsumptions(false);
    }
    if (event.target.id !== "button-deleteCustomer") {
      setDeleteCustomer(false);
    }
    if (event.target.id !== "button-deleteProduct") {
      setDeleteProduct(false);
    }
  };

  const handleAddCustomerSubmit = () => {
    const newCustomer = {
      name: customerName,
      address: customerAddress,
      phone: customerPhone,
    };

    axios
      .post("http://localhost:8800/customers", newCustomer)
      .then((response) => {
        setAddConsumption(false);
        setCustomerName("");
        setCustomerAddress("");
        setCustomerPhone("");
      })
      .catch((error) => {
        setAddConsumption(false);
        setCustomerName("");
        setCustomerAddress("");
        setCustomerPhone("");
        console.error("Error creating customer:", error);
      });
  };

  const handleDeleteCustomer = () => {
    axios
      .delete(`http://localhost:8800/customers/${customerId}`)
      .then((response) => {
        // Müşteri başarıyla silindi
        console.log("Customer deleted successfully");
        // İşlemleri gerçekleştirme veya state güncellemeleri
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
        // Hata durumunda gerekli işlemler veya hata mesajını gösterme
      });
  };

  const handleAddBillSubmit = () => {
    const newBill = {
      customer_id: customerId,
      product_id: productId,
      total_amount: totalAmount,
    };

    axios
      .post("http://localhost:8800/bills", newBill)
      .then((response) => {
        setAddBill(false);
        setProductId("");
        setCustomerId("");
        setTotalAmount("");
      })
      .catch((error) => {
        setAddBill(false);
        setProductId("");
        setCustomerId("");
        setTotalAmount("");
        console.error("Error creating bill:", error);
      });
  };

  const handleAddMachineSubmit = () => {
    const newBill = {
      quote: machineQuote,
      counter: machineCounter,
      address: machineAddress,
      product_id: productId,
      customer_id: customerId,
    };

    axios
      .post("http://localhost:8800/machines", newBill)
      .then((response) => {
        setAddBill(false);
        setProductId("");
        setCustomerId("");
        setMachineAddress("");
        setMachineQuote("");
        setMachineCounter("");
      })
      .catch((error) => {
        setAddBill(false);
        setProductId("");
        setCustomerId("");
        setMachineAddress("");
        setMachineQuote("");
        setMachineCounter("");
        console.error("Error creating bill:", error);
      });
  };

  const handleAssignMachineSubmit = () => {
    const newBill = {
      machine_id: machineId,
      customer_id: customerId,
    };

    axios
      .post("http://localhost:8800/machines/assign", newBill)
      .then((response) => {
        setAddBill(false);
        setMachineId("");
        setCustomerId("");
      })
      .catch((error) => {
        setAddBill(false);
        setMachineId("");
        setCustomerId("");
        console.error("Error creating bill:", error);
      });
  };

  const handleAddConsumptionSubmit = () => {
    const newConsume = {
      machine_id: machineId,
      quantity: quantity,
    };

    axios
      .post("http://localhost:8800/consumptions", newConsume)
      .then((response) => {
        setAddConsumption(false);
        setMachineId("");
        setQuantity("");
      })
      .catch((error) => {
        setAddConsumption(false);
        setMachineId("");
        setQuantity("");
        console.error("Error creating bill:", error);
      });
  };

  const handleAddProductSubmit = () => {
    const newBill = {
      name: productName,
      description: productDescription,
      price: productPrice,
    };

    axios
      .post("http://localhost:8800/products", newBill)
      .then((response) => {
        setAddProduct(false);
        setProductName("");
        setProductPrice("");
        setProductDescription("");
      })
      .catch((error) => {
        setAddProduct(false);
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        console.error("Error creating bill:", error);
      });
  };

  const handleDeleteProduct = () => {
    axios
      .delete(`http://localhost:8800/products/${productId}`)
      .then((response) => {
        // Product deleted successfully
        console.log("Product deleted:", response.data);
        // Perform any necessary actions after deleting the product
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle the error appropriately
      });
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div id="header">
        <div className=" bg-[#FF8652] w-screen h-[6rem]  flex items-center justify-center text-[#000000]">
          <div className=" flex justify-center items-center gap-8 font-bold text-3xl">
            <p>Database Project</p>
            <p> -- </p>
            <p> MYSQL QUERY</p>
          </div>
        </div>
      </div>
      <div
        id="body"
        className="top-18 w-screen min-h-screen bg-[#F6F1E9] overflow-scroll"
      >
        <div id="selections">
          <p className=" mx-16 mt-16 border-b-4 border-black w-fit">Database</p>
          <div className="ml-16 mt-4 grid grid-cols-5 gap-4 w-fit">
            <button
              onClick={() => setSelect(0)}
              className={` transition-all duration-300 p-4 rounded-xl border-4 border-[#FF8400] ${
                select === 0
                  ? "bg-[#FF8400] text-white"
                  : "hover:bg-[#FF8400] hover:text-white"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setSelect(1)}
              className={`transition-all duration-300 p-4 rounded-xl border-4 border-[#FF8400] ${
                select === 1
                  ? "bg-[#FF8400] text-white"
                  : "hover:bg-[#FF8400] hover:text-white"
              }`}
            >
              Bill
            </button>
            <button
              onClick={() => setSelect(2)}
              className={`transition-all duration-300 p-4 rounded-xl border-4  border-[#FF8400] ${
                select === 2
                  ? "bg-[#FF8400] text-white"
                  : "hover:bg-[#FF8400] hover:text-white"
              }`}
            >
              Consumption
            </button>
            <button
              onClick={() => setSelect(3)}
              className={`transition-all duration-300 p-4 rounded-xl border-4 border-[#FF8400] ${
                select === 3
                  ? "bg-[#FF8400] text-white"
                  : "hover:bg-[#FF8400] hover:text-white"
              }`}
            >
              Machine
            </button>
            <button
              onClick={() => setSelect(4)}
              className={`transition-all duration-300 p-4 rounded-xl border-4 border-[#FF8400] ${
                select === 4
                  ? "bg-[#FF8400] text-white"
                  : "hover:bg-[#FF8400] hover:text-white"
              }`}
            >
              Product
            </button>
          </div>
        </div>
        <div id="buttons" className=" m-16 grid grid-cols-4 gap-8">
          {select === 0 && (
            <>
              <div
                onClick={() => setGetCustomer(true)}
                id="button-getCustomer"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl 
              cursor-pointer hover:opacity-40
             transition-all duration-300 transform`}
              >
                <div className="text-white font-bold" id="button-getCustomer">
                  Get Customer
                </div>
              </div>
              <div
                onClick={() => setDeleteCustomer(true)}
                id="button-deleteCustomer"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              deleteCustomer ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {deleteCustomer ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-deleteCustomer"
                  >
                    <TextField
                      id="button-deleteCustomer"
                      label="Customer ID"
                      variant="outlined"
                      value={customerId}
                      onChange={handleChange}
                    />
                    <button
                      id="button-deleteCustomer"
                      onClick={handleDeleteCustomer}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-deleteCustomer"
                  >
                    Delete Customer
                  </div>
                )}
              </div>
              <div
                onClick={() => setAddCustomer(true)}
                id="button-addCustomer"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              addCustomer ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {addCustomer ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-addCustomer"
                  >
                    <TextField
                      id="button-addCustomer"
                      label="Name"
                      variant="outlined"
                      value={customerName}
                      onChange={(event) => {
                        setCustomerName(event.target.value);
                      }}
                    />
                    <TextField
                      id="button-addCustomer"
                      label="Address"
                      variant="outlined"
                      value={customerAddress}
                      onChange={(event) => {
                        setCustomerAddress(event.target.value);
                      }}
                    />
                    <TextField
                      id="button-addCustomer"
                      label="Phone"
                      variant="outlined"
                      value={customerPhone}
                      onChange={(event) => {
                        setCustomerPhone(event.target.value);
                      }}
                    />
                    <button
                      id="button-addCustomer"
                      onClick={handleAddCustomerSubmit}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="text-white font-bold" id="button-addCustomer">
                    Add Customer
                  </div>
                )}
              </div>
              <div
                onClick={() => setGetCustomerConsumption(true)}
                id="button-getCustomerConsumptions"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              getCustomerConsumption ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {getCustomerConsumption ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-getCustomerConsumptions"
                  >
                    <TextField
                      id="button-getCustomerConsumptions"
                      label="Customer ID"
                      variant="outlined"
                      value={customerId}
                      onChange={handleChange}
                    />
                    <button
                      id="button-getCustomerConsumptions"
                      onClick={() => setSubmit(true)}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-getCustomerConsumptions"
                  >
                    Get Customer Consumption
                  </div>
                )}
              </div>
              <div
                onClick={() => setGetCustomerBill(true)}
                id="button-getCustomerBill"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              getCustomerBill ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {getCustomerBill ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-getCustomerBill"
                  >
                    <TextField
                      id="button-getCustomerBill"
                      label="Customer ID"
                      variant="outlined"
                      value={customerId}
                      onChange={handleChange}
                    />
                    <button
                      id="button-getCustomerBill"
                      onClick={() => setSubmit(true)}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-getCustomerBill"
                  >
                    Get Customer Bills
                  </div>
                )}
              </div>
              <div
                onClick={() => setGetCustomerMachine(true)}
                id="button-getCustomerMachine"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              getCustomerMachine ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {getCustomerMachine ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-getCustomerMachine"
                  >
                    <TextField
                      id="button-getCustomerMachine"
                      label="Customer ID"
                      variant="outlined"
                      value={customerId}
                      onChange={handleChange}
                    />
                    <button
                      id="button-getCustomerMachine"
                      onClick={() => setSubmit(true)}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-getCustomerMachine"
                  >
                    Get Customer Machines
                  </div>
                )}
              </div>
            </>
          )}
          {select === 1 && (
            <>
              <div
                onClick={() => setGetBill(true)}
                id="button-getBill"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl 
              cursor-pointer hover:opacity-40
             transition-all duration-300 transform`}
              >
                <div className="text-white font-bold" id="button-getBill">
                  Get Bill
                </div>
              </div>
              <div
                onClick={() => setAddBill(true)}
                id="button-addBill"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              addBill ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {addBill ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-addBill"
                  >
                    <TextField
                      id="button-addBill"
                      label="Customer ID"
                      variant="outlined"
                      value={customerId}
                      onChange={handleChange}
                    />
                    <TextField
                      id="button-addBill"
                      label="Product ID"
                      variant="outlined"
                      value={productId}
                      onChange={handleChangeProductId}
                    />
                    <TextField
                      id="button-addBill"
                      label="Total Amount"
                      variant="outlined"
                      value={totalAmount}
                      onChange={handleChangeTotalAmount}
                    />
                    <button
                      id="button-addBill"
                      onClick={handleAddBillSubmit}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="text-white font-bold" id="button-addBill">
                    Add Bill
                  </div>
                )}
              </div>
            </>
          )}
          {select === 2 && (
            <>
              <div
                onClick={() => setGetConsumpiton(true)}
                id="button-getConsumption"
                className={` w-[20rem] h-[24rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl 
              cursor-pointer hover:opacity-40
             transition-all duration-300 transform`}
              >
                <div
                  className="text-white font-bold"
                  id="button-getConsumption"
                >
                  Get Consumption
                </div>
              </div>
              <div
                onClick={() => setAddConsumption(true)}
                id="button-addConsumption"
                className={` w-[20rem] h-[24rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              addConsumpiton ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {addConsumpiton ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-addConsumption"
                  >
                    <TextField
                      id="button-addConsumption"
                      label="Machine ID"
                      variant="outlined"
                      value={machineId}
                      onChange={handleChangeMachineId}
                    />
                    <TextField
                      id="button-addConsumption"
                      label="Quantity"
                      variant="outlined"
                      value={quantity}
                      onChange={handleChangeQuantity}
                    />
                    <button
                      id="button-addConsumption"
                      onClick={handleAddConsumptionSubmit}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-addConsumotion"
                  >
                    Add Consumption
                  </div>
                )}
              </div>
            </>
          )}
          {select === 4 && (
            <>
              <div
                onClick={() => setGetProduct(true)}
                id="button-getProduct"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl 
              cursor-pointer hover:opacity-40
             transition-all duration-300 transform`}
              >
                <div className="text-white font-bold" id="button-getProduct">
                  Get Product
                </div>
              </div>
              <div
                onClick={() => setAddProduct(true)}
                id="button-addProduct"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              addProduct ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {addProduct ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-addProduct"
                  >
                    <TextField
                      id="button-addProduct"
                      label="Product Name"
                      variant="outlined"
                      value={productName}
                      onChange={handleChangeProductName}
                    />
                    <TextField
                      id="button-addProduct"
                      label="Product Price"
                      variant="outlined"
                      value={productPrice}
                      onChange={handleChangeProductPrice}
                    />
                    <TextField
                      id="button-addProduct"
                      label="Product Description"
                      variant="outlined"
                      value={productDescription}
                      onChange={handleChangeProductDescription}
                    />
                    <button
                      id="button-addProduct"
                      onClick={handleAddProductSubmit}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="text-white font-bold" id="button-addProduct">
                    Add Product
                  </div>
                )}
              </div>
              <div
                onClick={() => setDeleteProduct(true)}
                id="button-deleteProduct"
                className={` w-[20rem] h-[20rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              deleteProduct ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {deleteProduct ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-deleteProduct"
                  >
                    <TextField
                      id="button-deleteProduct"
                      label="Product ID"
                      variant="outlined"
                      value={productId}
                      onChange={handleChangeProductId}
                    />

                    <button
                      id="button-deleteProduct"
                      onClick={handleDeleteProduct}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-deleteProduct"
                  >
                    Delete Product
                  </div>
                )}
              </div>
            </>
          )}
          {select === 3 && (
            <>
              <div
                onClick={() => setGetMachine(true)}
                id="button-getMachine"
                className={` w-[20rem] h-[28rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl 
              cursor-pointer hover:opacity-40
             transition-all duration-300 transform`}
              >
                <div className="text-white font-bold" id="button-getMachine">
                  Get Machine
                </div>
              </div>
              <div
                onClick={() => setAddMachine(true)}
                id="button-addMachine"
                className={` w-[20rem] h-[28rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              addMachine ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {addMachine ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-addMachine"
                  >
                    <TextField
                      id="button-addMachine"
                      label="Product ID"
                      variant="outlined"
                      value={productId}
                      onChange={handleChangeProductId}
                    />
                    <TextField
                      id="button-addMachine"
                      label="Customer ID"
                      variant="outlined"
                      value={customerId}
                      onChange={handleChange}
                    />
                    <TextField
                      id="button-addMachine"
                      label="Machine Quote"
                      variant="outlined"
                      value={machineQuote}
                      onChange={handleChangeMachineQuote}
                    />
                    <TextField
                      id="button-addMachine"
                      label="Machine Counter"
                      variant="outlined"
                      value={machineCounter}
                      onChange={handleChangeMachineCounter}
                    />
                    <TextField
                      id="button-addMachine"
                      label="Machine Address"
                      variant="outlined"
                      value={machineAddress}
                      onChange={handleChangeMachineAddress}
                    />
                    <button
                      id="button-addMachine"
                      onClick={handleAddMachineSubmit}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="text-white font-bold" id="button-addMachine">
                    Add Machine
                  </div>
                )}
              </div>
              <div
                onClick={() => setAssignMachine(true)}
                id="button-assignMachine"
                className={` w-[20rem] h-[28rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              assignMachine ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {assignMachine ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-assignMachine"
                  >
                    <TextField
                      id="button-assignMachine"
                      label="Machine ID"
                      variant="outlined"
                      value={machineId}
                      onChange={handleChangeMachineId}
                    />
                    <TextField
                      id="button-assignMachine"
                      label="Customer ID"
                      variant="outlined"
                      value={customerId}
                      onChange={handleChange}
                    />
                    <button
                      id="button-assignMachine"
                      onClick={handleAssignMachineSubmit}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-assignMachine"
                  >
                    Assign Machine
                  </div>
                )}
              </div>
              <div
                onClick={() => setGetMachineProduct(true)}
                id="button-getMachineProduct"
                className={` w-[20rem] h-[28rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              getMachineProduct ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {getMachineProduct ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-getMachineProduct"
                  >
                    <TextField
                      id="button-getMachineProduct"
                      label="Machine ID"
                      variant="outlined"
                      value={machineId}
                      onChange={handleChangeMachineId}
                    />
                    <button
                      id="button-getMachineProduct"
                      onClick={() => setSubmit(true)}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-getMachineProduct"
                  >
                    Machine Product
                  </div>
                )}
              </div>
              <div
                onClick={() => setGetMachineConsumptions(true)}
                id="button-getMachineConsumptions"
                className={` w-[20rem] h-[28rem] p-4 bg-[#262A56] 
            flex items-center justify-center rounded-xl ${
              getMachineConsumptions ? "" : " cursor-pointer hover:opacity-40"
            } transition-all duration-300 transform`}
              >
                {getMachineConsumptions ? (
                  <div
                    className=" flex flex-col justify-between items-center rounded-xl bg-white p-4 w-full h-full"
                    id="button-getMachineConsumptions"
                  >
                    <TextField
                      id="button-getMachineConsumptions"
                      label="Machine ID"
                      variant="outlined"
                      value={machineId}
                      onChange={handleChangeMachineId}
                    />
                    <button
                      id="button-getMachineConsumptions"
                      onClick={() => setSubmit(true)}
                      className=" p-2 bg-[#FF8400] text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-white font-bold"
                    id="button-getMachineConsumptions"
                  >
                    Machine Consumptions
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className=" m-16 bg-white rounded-xl shadow-lg " id="list">
          {getCustomerConsumption && (
            <CustomerConsumptionsList
              submit={submit}
              setSubmit={(val) => {
                setSubmit(val);
              }}
              customerID={customerId}
            />
          )}
          {getCustomerBill && (
            <CustomerBillsList
              submit={submit}
              setSubmit={(val) => {
                setSubmit(val);
              }}
              customerID={customerId}
            />
          )}
          {getCustomerMachine && (
            <CustomerMachinesList
              submit={submit}
              setSubmit={(val) => {
                setSubmit(val);
              }}
              customerID={customerId}
            />
          )}
          {getCustomer && <CustomerList />}
          {getBill && <BillList />}
          {getConsumption && <ConsumptionList />}
          {getProduct && <ProductList />}
          {getMachine && <MachineList />}
          {getMachineProduct && (
            <MachineProductList
              submit={submit}
              setSubmit={(val) => {
                setSubmit(val);
              }}
              machineID={machineId}
            />
          )}
          {getMachineConsumptions && (
            <MachineConsumptionList
              submit={submit}
              setSubmit={(val) => {
                setSubmit(val);
              }}
              machineID={machineId}
            />
          )}
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
