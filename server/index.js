const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const port = 8800; // Replace with the desired port number

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "66894761",
  database: "machinemanagement",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/customers", (req, res) => {
  const { name, address, phone } = req.body;

  const sql = `INSERT INTO Customer (name, address, phone) VALUES (?, ?, ?)`;
  db.query(sql, [name, address, phone], (err, result) => {
    if (err) {
      console.error("Error creating customer: ", err);
      res.sendStatus(500);
      return;
    }

    res.json({ customer_id: result.insertId });
  });
});

app.get("/customers", (req, res) => {
  const sql = `SELECT * FROM Customer`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving customers: ", err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});

app.delete("/customers/:customerId", (req, res) => {
  const customerId = req.params.customerId;

  const deleteCustomerSql = "DELETE FROM Customer WHERE customer_id = ?";
  const deleteCustomerTriggerSql = "CALL after_delete_customer(?)";

  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: ", err);
      res.sendStatus(500);
      return;
    }
    db.query(deleteCustomerTriggerSql, [customerId], (err) => {
      if (err) {
        console.error("Error triggering after_delete_customer: ", err);
        db.rollback(() => {
          res.sendStatus(500);
        });
        return;
      }

      db.query(deleteCustomerSql, [customerId], (err, result) => {
        if (err) {
          console.error("Error deleting customer: ", err);
          db.rollback(() => {
            res.sendStatus(500);
          });
          return;
        }

        db.commit((err) => {
          if (err) {
            console.error("Error committing transaction: ", err);
            db.rollback(() => {
              res.sendStatus(500);
            });
            return;
          }

          res.sendStatus(200);
        });
      });
    });
  });
});

app.get("/", (req, res) => {
  return res.json("Welcome");
});

app.listen(port, () => {
  console.log("Connnected to database .");
});

app.get("/customer/:customerID/consumptions", (req, res) => {
  const customerID = req.params.customerID;

  const sql = `SELECT Consumption.quantity,Consumption.consumption_id,Consumption.product_id,Consumption.consumption_date,Consumption.machine_id, Product.name
                 FROM Consumption
                 JOIN Product ON Consumption.product_id = Product.product_id
                 WHERE Consumption.customer_id = ?`;

  db.query(sql, [customerID], (err, results) => {
    if (err) {
      console.error("Error retrieving consumptions: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(results);
  });
});

// Kesilmiş faturaları getiren endpoint
app.get("/customer/:customerID/bills", (req, res) => {
  const customerID = req.params.customerID;

  const sql = `SELECT * FROM Bill WHERE customer_id = ?`;

  db.query(sql, [customerID], (err, results) => {
    if (err) {
      console.error("Error retrieving bills: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(results);
  });
});

// Belirli bir müşteriye ait makineleri listele
app.get("/customer/:customerID/machines", (req, res) => {
  const customerID = req.params.customerID;

  const sql = `SELECT * FROM Machine WHERE customer_id = ?`;

  db.query(sql, [customerID], (err, results) => {
    if (err) {
      console.error("Error retrieving machines: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(results);
  });
});

// Tüm faturaları listele
app.get("/bills", (req, res) => {
  const sql = `SELECT * FROM Bill`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving bills: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(results);
  });
});

// Fatura oluşturma
app.post("/bills", (req, res) => {
  const { customer_id, product_id, total_amount, bill_date } = req.body;

  const sql = `INSERT INTO Bill (customer_id, product_id, total_amount, bill_date) 
               VALUES (?, ?, ?, NOW())`;

  db.query(
    sql,
    [customer_id, product_id, total_amount, bill_date],
    (err, result) => {
      if (err) {
        console.error("Error creating bill: ", err);
        res.sendStatus(500);
        return;
      }

      res.json({ bill_id: result.insertId });
    }
  );
});

// Tüm tüketimleri listele
app.get("/consumptions", (req, res) => {
  const sql = `SELECT * FROM Consumption`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving consumptions: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(results);
  });
});

app.post("/consumptions", (req, res) => {
  const { machine_id, quantity } = req.body;

  const sql = `INSERT INTO Consumption (machine_id, product_id, quantity, customer_id, consumption_date) 
               SELECT machine_id, product_id, ?, customer_id, NOW()
               FROM Machine
               WHERE machine_id = ?`;

  const checkMachineQuotaSql = `SELECT quote, counter 
                                FROM Machine 
                                WHERE machine_id = ?`;

  const updateMachineQuotaSql = `UPDATE Machine 
                                 SET quote = quote - ?, counter = counter + ? 
                                 WHERE machine_id = ?`;

  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: ", err);
      res.sendStatus(500);
      return;
    }

    db.query(checkMachineQuotaSql, [machine_id], (err, results) => {
      if (err) {
        console.error("Error checking machine quota: ", err);
        db.rollback(() => {
          res.sendStatus(500);
        });
        return;
      }

      if (results.length === 0 || results[0].quote < quantity) {
        // Makine kotası yetersiz
        db.rollback(() => {
          res.status(400).json({ error: "Insufficient machine quota" });
        });
        return;
      }

      db.query(sql, [quantity, machine_id], (err, result) => {
        if (err) {
          console.error("Error creating consumption: ", err);
          db.rollback(() => {
            res.sendStatus(500);
          });
          return;
        }

        if (result.affectedRows === 0) {
          // Makine bulunamadı
          db.rollback(() => {
            res.status(400).json({ error: "Machine not found" });
          });
          return;
        }

        db.query(
          updateMachineQuotaSql,
          [quantity, quantity, machine_id],
          (err, result) => {
            if (err) {
              console.error("Error updating machine quota: ", err);
              db.rollback(() => {
                res.sendStatus(500);
              });
              return;
            }

            db.commit((err) => {
              if (err) {
                console.error("Error committing transaction: ", err);
                db.rollback(() => {
                  res.sendStatus(500);
                });
                return;
              }

              res.json({ consumption_id: result.insertId });
            });
          }
        );
      });
    });
  });
});

// Ürün ekleme
app.post("/products", (req, res) => {
  const { name, description, price } = req.body;

  const sql = `INSERT INTO Product (name, description, price) VALUES (?, ?, ?)`;

  db.query(sql, [name, description, price], (err, result) => {
    if (err) {
      console.error("Error creating product: ", err);
      res.sendStatus(500);
      return;
    }

    res.json({ product_id: result.insertId });
  });
});

app.delete("/products/:productId", (req, res) => {
  const productId = req.params.productId;

  // Delete associated machines
  const deleteMachinesSql = "DELETE FROM Machine WHERE product_id = ?";
  db.query(deleteMachinesSql, [productId], (err, result) => {
    if (err) {
      console.error("Error deleting associated machines: ", err);
      res.sendStatus(500);
      return;
    }

    // Delete product
    const deleteProductSql = "DELETE FROM Product WHERE product_id = ?";
    db.query(deleteProductSql, [productId], (err, result) => {
      if (err) {
        console.error("Error deleting product: ", err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    });
  });
});

// Tüm ürünleri getirme
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM Product";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving products: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(result);
  });
});

// Belirli bir makinenin tüketimini listele
app.get("/machine/:machineID/consumptions", (req, res) => {
  const machineID = req.params.machineID;

  const sql = `SELECT * FROM Consumption WHERE machine_id = ?`;

  db.query(sql, [machineID], (err, results) => {
    if (err) {
      console.error("Error retrieving consumptions: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(results);
  });
});

app.get("/machine/:machineID/products", (req, res) => {
  const machineID = req.params.machineID;

  const sql = `SELECT Product.*
               FROM Machine
               JOIN Product ON Machine.product_id = Product.product_id
               WHERE Machine.machine_id = ?`;

  db.query(sql, [machineID], (err, results) => {
    if (err) {
      console.error("Error retrieving products: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(results);
  });
});

// Makine atama
app.post("/machines/assign", (req, res) => {
  const { machine_id, customer_id } = req.body;

  const sql = `UPDATE Machine SET customer_id = ? WHERE machine_id = ?`;

  db.query(sql, [customer_id, machine_id], (err) => {
    if (err) {
      console.error("Error assigning machine: ", err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

// Tüm makineleri listele
app.get("/machines", (req, res) => {
  const sql = `SELECT * FROM Machine`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving machines: ", err);
      res.sendStatus(500);
      return;
    }

    res.json(results);
  });
});

// Makine oluşturma
app.post("/machines", (req, res) => {
  const { quote, counter, address, product_id, customer_id } = req.body;

  const sql = `INSERT INTO Machine (quote, counter, address, product_id, customer_id) 
                 VALUES (?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [quote, counter, address, product_id, customer_id],
    (err, result) => {
      if (err) {
        console.error("Error creating machine: ", err);
        res.sendStatus(500);
        return;
      }

      res.json({ machine_id: result.insertId });
    }
  );
});
