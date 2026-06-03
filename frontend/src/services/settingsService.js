import api from "./api";

export const getSettings = () =>
  api.get("/settings");

export const updateSettings = (id, settings) =>
  api.put(`/settings/${id}`, settings);