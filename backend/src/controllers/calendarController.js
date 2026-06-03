const supabase = require("../config/supabase");

// Create Event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      start_date,
      end_date,
    } = req.body;

    const { data, error } = await supabase
      .from("calendar_events")
      .insert([
        {
          title,
          description,
          start_date,
          end_date,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Events
const getEvents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("start_date", { ascending: true });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      start_date,
      end_date,
    } = req.body;

    const { data, error } = await supabase
      .from("calendar_events")
      .update({
        title,
        description,
        start_date,
        end_date,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};