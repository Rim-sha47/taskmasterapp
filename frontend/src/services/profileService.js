import api from "./api";

export const getProfile = () =>
  api.get("/auth/profile");

export const updateProfile = (
  profileData
) =>
  api.put(
    "/auth/profile",
    profileData
  );