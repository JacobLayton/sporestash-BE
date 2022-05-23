const express = require("express");
const router = express.Router();

const db = require("../../data/dbConfig");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { checkJwt } = require("../check-jwt");

// GET all orders
router.get("/", checkJwt, async (req, res) => {
  await db("orders")
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get orders." });
    });
});

// GET order with id
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   await db("orders")
//     .where({ order_id: id })
//     .then((order) => {
//       if (order) {
//         res.status(200).json(order);
//       } else {
//         res.status(404).json({ message: "There is no order with that id." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to get order." });
//     });
// });

// GET all orders of category
// router.get("/category/:cat", async (req, res) => {
//   const { cat } = req.params;
//   await db("orders")
//     .where({ order_category: cat })
//     .then((orders) => {
//       if (orders) {
//         res.status(200).json(orders);
//       } else {
//         res
//           .status(404)
//           .json({ message: "There are no orders matching that cetegory." });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Failed to get category orders." });
//     });
// });

// POST new Order
// router.post("/", async (req, res) => {
//   await db("orders")
//     .insert(req.body)
//     .then((Order) => {
//       if (Order) {
//         return res
//           .status(200)
//           .json({ message: "Order was created successfully." });
//       } else {
//         return res.status(404).json({ error: "Could not create new Order" });
//       }
//     })
//     .catch((err) => {
//       return res.status(500).json(err);
//     });
// });

// PUT edit order
router.put("/:id", checkJwt, async (req, res) => {
  const { id } = req.params;
  await db("orders")
    .where({ order_id: id })
    .update(req.body)
    .then((updatedOrder) => {
      if (updatedOrder) {
        return res
          .status(200)
          .json({ message: "Order was successfully updated." });
      } else {
        return res
          .status(404)
          .json({ error: "Could not update Order with that id." });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// DELETE order at id
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   await db("orders")
//     .where({ order_id: id })
//     .del()
//     .then((deletedOrder) => {
//       if (deletedOrder) {
//         return res
//           .status(200)
//           .json({ message: "Order was successfully deleted." });
//       } else {
//         return res
//           .status(404)
//           .json({ error: "Could not delete Order with that id." });
//       }
//     })
//     .catch((err) => {
//       return res.status(500).json(err);
//     });
// });

module.exports = router;
