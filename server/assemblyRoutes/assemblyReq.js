const router = require("express").Router();
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

/// Routes to assemblyAI API to trascribe AV File. Hits URL directly. Free Trial.
router.get("/", async (req, res) => {
  res.send(req.query.productName);
});

module.exports = router;
