import api from "./api";

export const getDashboardStats = () =>
  api.get("/dashboard/stats");

export const getNotifications = () =>
  api.get("/notifications");