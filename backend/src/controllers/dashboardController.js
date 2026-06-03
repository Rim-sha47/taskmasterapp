const supabase = require("../config/supabase");

const getDashboardStats = async (req, res) => {
  try {
    const { data: tasks, error: tasksError } = await supabase
      .from("tasks")
      .select("*");

    if (tasksError) throw tasksError;

    const { data: members, error: membersError } = await supabase
      .from("members")
      .select("*");

    if (membersError) throw membersError;

    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*");

    if (eventsError) throw eventsError;

    const { data: notifications, error: notificationsError } =
      await supabase
        .from("notifications")
        .select("*");

    if (notificationsError) throw notificationsError;

    const stats = {
      totalTasks: tasks.length,
      todo: tasks.filter(
        (task) => task.status === "todo"
      ).length,

      inProgress: tasks.filter(
        (task) => task.status === "in-progress"
      ).length,

      review: tasks.filter(
        (task) => task.status === "review"
      ).length,

      completed: tasks.filter(
        (task) => task.status === "completed"
      ).length,

      totalMembers: members.length,

      activeMembers: members.filter(
        (member) => member.status === "active"
      ).length,

      totalEvents: events.length,

      unreadNotifications: notifications.filter(
        (notification) => !notification.is_read
      ).length,
    };

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};