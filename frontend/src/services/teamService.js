import api from "./api";

export const getMembers = () =>
  api.get("/team");

export const createMember = (member) =>
  api.post("/team", member);

export const updateMember = (id, member) =>
  api.put(`/team/${id}`, member);

export const deleteMember = (id) =>
  api.delete(`/team/${id}`);