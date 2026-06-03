const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

router.get("/test", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }

  res.status(200).json({
    success: true,
    data,
  });
});

module.exports = router;