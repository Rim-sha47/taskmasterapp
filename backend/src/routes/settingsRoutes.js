const express = require("express");
const router = express.Router();

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

router.get("/", getSettings);

router.put("/:id", updateSettings);

module.exports = router;