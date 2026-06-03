import api from "./api";

export const getNotifications = () =>
  api.get("/notifications");

export const markRead = (id) =>
  api.patch(`/notifications/${id}/read`);

export const deleteNotification = (id) =>
  api.delete(`/notifications/${id}`);