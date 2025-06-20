import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Talent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(""); // 👈 to track current user's role

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole") || ""); // 👈 fetch role
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/user/all");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBookmark = (userId: string) => {
    // TODO: Implement actual bookmarking logic here (API call maybe)
    console.log(`Bookmarked user: ${userId}`);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Discover Talent</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <p className="text-sm text-gray-600 mb-2">{user.bio}</p>
              {/* Add other user details here */}

              {/* Show Bookmark button only if user is a recruiter */}
              {userRole === "recruiter" && (
                <Button
                  onClick={() => handleBookmark(user._id)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  🔖 Bookmark
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Talent;
