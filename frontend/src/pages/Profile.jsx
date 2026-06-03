import { useEffect, useState } from "react";
import PageWrapper from "../components/common/PageWrapper";
import GlowCard from "../components/common/GlowCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const savedImage =
      localStorage.getItem("profileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setIsEditing(false);

    alert("Profile Updated Successfully");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);

      localStorage.setItem(
        "profileImage",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <PageWrapper title="Profile">
        <div className="text-center text-white">
          Loading...
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="My Profile"
      subtitle="Manage your account information"
    >
      <GlowCard
        className="p-8"
        glowColor="cyan"
      >
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white">
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            id="profile-upload"
            className="hidden"
            onChange={handleImageUpload}
          />

          <label
            htmlFor="profile-upload"
            className="mt-4 cursor-pointer rounded-xl bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition"
          >
            Change Photo
          </label>
        </div>

        {/* Editable Fields */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="mb-4">
            <label className="block text-sm text-text-secondary mb-2">
              Name
            </label>

            <input
              value={user?.name || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Email
            </label>

            <input
              value={user?.email || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-white"
            />
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="glass p-4 rounded-2xl border border-white/10">
            <p className="text-text-secondary text-sm">
              Role
            </p>

            <p className="text-text-primary mt-2">
              User
            </p>
          </div>

          <div className="glass p-4 rounded-2xl border border-white/10">
            <p className="text-text-secondary text-sm">
              Status
            </p>

            <p className="text-green-400 mt-2">
              Active
            </p>
          </div>

          <div className="glass p-4 rounded-2xl border border-white/10">
            <p className="text-text-secondary text-sm">
              Account
            </p>

            <p className="text-text-primary mt-2">
              Verified
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {!isEditing ? (
            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>

              <button
                onClick={() =>
                  setIsEditing(false)
                }
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </GlowCard>
    </PageWrapper>
  );
}