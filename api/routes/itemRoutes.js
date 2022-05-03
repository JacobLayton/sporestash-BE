const express = require("express");
const router = express.Router();

const db = require("../../data/dbConfig");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { checkJwt } = require("../check-jwt");

// GET all items
router.get("/", async (req, res) => {
  await db("items")
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get items." });
    });
});

// GET all items server side
router.get("/api", async (req, res) => {
  await db("items")
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get items." });
    });
});

// GET item with id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await db("items")
    .where({ item_id: id })
    .then((item) => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "There is no item with that id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get item." });
    });
});

// GET all items of category
router.get("/category/:cat", async (req, res) => {
  const { cat } = req.params;
  await db("items")
    .where({ item_category: cat })
    .then((items) => {
      if (items) {
        res.status(200).json(items);
      } else {
        res
          .status(404)
          .json({ message: "There are no items matching that cetegory." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get category items." });
    });
});

// POST new item
router.post("/", checkJwt, async (req, res) => {
  await db("items")
    .insert(req.body)
    .then((item) => {
      if (item) {
        return res
          .status(200)
          .json({ message: "Item was created successfully." });
      } else {
        return res.status(404).json({ error: "Could not create new Item" });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// PUT edit item
router.put("/:id", checkJwt, async (req, res) => {
  const { id } = req.params;
  await db("items")
    .where({ item_id: id })
    .update(req.body)
    .then((updatedItem) => {
      if (updatedItem) {
        return res
          .status(200)
          .json({ message: "Item was successfully updated." });
      } else {
        return res
          .status(404)
          .json({ error: "Could not update Item with that id." });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// DELETE item at id
router.delete("/:id", checkJwt, async (req, res) => {
  const { id } = req.params;
  await db("items")
    .where({ item_id: id })
    .del()
    .then((deletedItem) => {
      if (deletedItem) {
        return res
          .status(200)
          .json({ message: "Item was successfully deleted." });
      } else {
        return res
          .status(404)
          .json({ error: "Could not delete Item with that id." });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;
