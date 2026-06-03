const supabase = require("../config/supabase");

const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Search Tasks
    const { data: tasks, error: taskError } = await supabase
      .from("tasks")
      .select("*")
      .or(`title.ilike.%${q}%,description.ilike.%${q}%`);

    if (taskError) throw taskError;

    // Search Team Members
    const { data: members, error: memberError } = await supabase
      .from("team_members")
      .select("*")
      .or(`name.ilike.%${q}%,designation.ilike.%${q}%`);

    if (memberError) throw memberError;

    // Search Calendar Events
    const { data: events, error: eventError } = await supabase
      .from("calendar_events")
      .select("*")
      .or(`title.ilike.%${q}%,description.ilike.%${q}%`);

    if (eventError) throw eventError;

    res.status(200).json({
      success: true,
      results: {
        tasks,
        members,
        events,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  globalSearch,
};