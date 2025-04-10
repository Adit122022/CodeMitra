import React, { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Mail, Pencil, User } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState("");
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(res.data);
      setLoading(false);
      console.log(res.data)
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (Loading)
    return (
      <div className="h-screen overflow-hidden pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl px-6 pt-4 ">
            <div className="p-4 flex items-center justify-center">Loading profile...</div>
          </div>
        </div>
      </div>
    );

  if (Error)
    return (
      <div className="h-screen overflow-hidden pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl px-6 pt-4 ">
            <div className="p-4 text-red-600 flex items-center justify-center">{Error}</div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="h-screen overflow-hidden pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl px-6 pt-4 ">
          <div className="flex  justify-between items-center ">
            <h1 className="text-2xl font-semibold font-serif  ">
              Your Profile
            </h1>

            <button className="btn   flex items-center gap-1">
              <Pencil size={16} /> Edit
            </button>
          </div>

          <div className="flex justify-between items-center px-12 py-8">
            {/* avatar upload section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 "
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              {/* <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p> */}
            </div>

            <div className="space-y-6 px-12">
              <div className="space-y-1.5  flex justify-between px-5 bg-base-200 rounded-lg border">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 ">{user.name}</p>
              </div>

              <div className="space-y-1.5 flex justify-between px-5 bg-base-200 rounded-lg border">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 ">{user.email}</p>
              </div>

              <div className="space-y-1.5 flex justify-between px-5 bg-base-200 rounded-lg border">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Bio
                </div>
                <p className="px-4 py-2.5 ">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium  mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

//   //   <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
//   //   <h1 className="text-2xl font-bold mb-4">Profile</h1>

//   //   <div className="mb-6">
//   //     <p><strong>Name:</strong> {user.name}</p>
//   //     <p><strong>Email:</strong> {user.email}</p>
//   //       <p><strong>Bio:</strong> {user.bio}</p>
//   //       <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
//   //       <p><strong>Reputation:</strong> {user.reputation}</p>
//   //   </div>
//   // </div>
