import api from "./api";

export const getEvents = () =>
  api.get("/calendar/events");

export const createEvent = (event) =>
  api.post("/calendar/events", event);

export const updateEvent = (id, event) =>
  api.put(`/calendar/events/${id}`, event);

export const deleteEvent = (id) =>
  api.delete(`/calendar/events/${id}`);