const express = require("express");
const sendMail = require("../send-mail");
const router = express.Router();

// POST new email
router.post("/", (req, res) => {
  const { category, name, email, subject, message } = req.body.messageData;

  sendMail(category, name, email, subject, message, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).json({ message: "Internal Error" });
    } else {
      res.status(200).json({ message: "Email Sent!" });
    }
  });
});

module.exports = router;
