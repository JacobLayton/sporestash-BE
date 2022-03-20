const express = require("express");
const router = express.Router();

const db = require("../../data/dbConfig");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// const { checkJwt } = require('../check-jwt');

// GET all customers
router.get("/", async (req, res) => {
  await db("customers")
    .then((customers) => {
      res.status(200).json(customers);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get customers." });
    });
});

// GET customer with id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await db("customers")
    .where({ customer_id: id })
    .then((customer) => {
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "There is no customer with that id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get customer." });
    });
});

// GET all customers of category
// router.get("/category/:cat", async (req, res) => {
//   const { cat } = req.params;
//   await db("customers")
//     .where({ item_category: cat })
//     .then((customers) => {
//       if (customers) {
//         res.status(200).json(customers);
//       } else {
//         res
//           .status(404)
//           .json({ message: "There are no customers matching that cetegory." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to get category customers." });
//     });
// });

// POST new customer
router.post("/", async (req, res) => {
  await db("customers")
    .insert(req.body)
    .then((customer) => {
      if (customer) {
        return res
          .status(200)
          .json({ message: "Customer was created successfully." });
      } else {
        return res.status(404).json({ error: "Could not create new Customer" });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// PUT edit customer
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await db("customers")
    .where({ customer_id: id })
    .update(req.body)
    .then((updatedCustomer) => {
      if (updatedCustomer) {
        return res
          .status(200)
          .json({ message: "Customer was successfully updated." });
      } else {
        return res
          .status(404)
          .json({ error: "Could not update Customer with that id." });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// DELETE customer at id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db("customers")
    .where({ customer_id: id })
    .del()
    .then((deletedCustomer) => {
      if (deletedCustomer) {
        return res
          .status(200)
          .json({ message: "Customer was successfully deleted." });
      } else {
        return res
          .status(404)
          .json({ error: "Could not delete Customer with that id." });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;
