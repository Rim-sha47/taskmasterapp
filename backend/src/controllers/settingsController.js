const supabase = require("../config/supabase");

// Get Settings
const getSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("user_settings")
      .select("*");

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Settings
const updateSettings = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      dark_mode,
      accent_color,
      email_notifications,
      app_notifications,
    } = req.body;

    const { data, error } = await supabase
      .from("user_settings")
      .update({
        dark_mode,
        accent_color,
        email_notifications,
        app_notifications,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data,
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};