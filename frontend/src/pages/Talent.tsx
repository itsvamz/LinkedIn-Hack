import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { User, Heart, Bookmark } from "lucide-react";

const Talent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [likedUsers, setLikedUsers] = useState(new Set());
  const [bookmarkedUsers, setBookmarkedUsers] = useState(new Set());

  useEffect(() => {
    const initializeData = async () => {
      const role = localStorage.getItem("userRole") || "";
      setUserRole(role);
      
      // Initialize liked users from localStorage
      const savedLikedUsers = localStorage.getItem("likedUsers");
      if (savedLikedUsers) {
        setLikedUsers(new Set(JSON.parse(savedLikedUsers)));
      }
      
      // Always fetch bookmarked candidates from backend if user is a recruiter
      if (role === "recruiter") {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          const response = await axios.get("http://localhost:5000/api/recruiter/bookmarked", {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // Create a Set of bookmarked candidate IDs
          const bookmarkedIds = new Set(response.data.map(candidate => candidate._id));
          setBookmarkedUsers(bookmarkedIds);
          
          // Update localStorage to keep it in sync with the database
          localStorage.setItem("bookmarkedUsers", JSON.stringify([...bookmarkedIds]));
          
          console.log("Fetched bookmarked candidates:", [...bookmarkedIds]);
        } catch (error) {
          console.error("Error fetching bookmarked candidates:", error);
          // Fallback to localStorage if API call fails
          const savedBookmarkedUsers = localStorage.getItem("bookmarkedUsers");
          if (savedBookmarkedUsers) {
            setBookmarkedUsers(new Set(JSON.parse(savedBookmarkedUsers)));
          }
        }
      } else {
        // If not a recruiter, just use localStorage (for consistency)
        const savedBookmarkedUsers = localStorage.getItem("bookmarkedUsers");
        if (savedBookmarkedUsers) {
          setBookmarkedUsers(new Set(JSON.parse(savedBookmarkedUsers)));
        }
      }
    };
    
    initializeData();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/user/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
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

  const handleLike = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const isCurrentlyLiked = likedUsers.has(userId);
      
      // Make API call
      await axios.post(
        `http://localhost:5000/api/user/analytics/${userId}`,
        { 
          type: "profileLike",
          action: isCurrentlyLiked ? "unlike" : "like"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      const newLikedUsers = new Set(likedUsers);
      if (isCurrentlyLiked) {
        newLikedUsers.delete(userId);
      } else {
        newLikedUsers.add(userId);
      }
      setLikedUsers(newLikedUsers);
      
      // Save to localStorage
      localStorage.setItem("likedUsers", JSON.stringify([...newLikedUsers]));
      
      console.log(`User ${userId} ${isCurrentlyLiked ? 'unliked' : 'liked'}`);
    } catch (error) {
      console.error("Error liking/unliking user:", error);
    }
  };

  const handleBookmark = async (userId) => {
    if (userRole !== "recruiter") {
      console.log("Only recruiters can bookmark candidates");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const isCurrentlyBookmarked = bookmarkedUsers.has(userId);
      
      // Make API call to bookmark/unbookmark candidate
      const response = await axios.post(
        "http://localhost:5000/api/recruiter/bookmark",
        { 
          candidateId: userId,
          action: isCurrentlyBookmarked ? "remove" : "add"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state only if API call was successful
      if (response.status === 200) {
        const newBookmarkedUsers = new Set(bookmarkedUsers);
        if (isCurrentlyBookmarked) {
          newBookmarkedUsers.delete(userId);
        } else {
          newBookmarkedUsers.add(userId);
        }
        setBookmarkedUsers(newBookmarkedUsers);
        
        // Update localStorage to stay in sync
        localStorage.setItem("bookmarkedUsers", JSON.stringify([...newBookmarkedUsers]));
        
        console.log(`Candidate ${userId} ${isCurrentlyBookmarked ? 'unbookmarked' : 'bookmarked'}`);
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('bookmarkUpdated', {
          detail: { candidateId: userId, isBookmarked: !isCurrentlyBookmarked }
        }));
      }
    } catch (error) {
      console.error("Error bookmarking/unbookmarking user:", error);
      // Optionally show user-friendly error message
      alert("Failed to update bookmark. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Discover Talent</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <img
                  src={user.avatar || "https://i.pravatar.cc/150?img=54"}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-100"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.fullName}</h3>
                  <p className="text-sm text-gray-600">{user.location || "Location not specified"}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="font-medium text-blue-600">
                  {user.skills?.[0] || "No primary skill listed"}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skills?.slice(1, 4).map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                  {user.skills?.length > 4 && (
                    <span className="text-xs text-gray-500">+{user.skills.length - 4} more</span>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {user.about || user.bio || "No description provided."}
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={async () => {
                    try {
                      // Track profile view
                      const token = localStorage.getItem("token");
                      await axios.post(
                        `http://localhost:5000/api/user/analytics/${user._id}`,
                        { type: "profileView" },
                        { headers: { Authorization: `Bearer ${token}` } }
                      );
                      console.log(`Profile view tracked for user ${user._id}`);
                    } catch (error) {
                      console.error("Error tracking profile view:", error);
                    }
                  }}
                >
                  <User className="w-4 h-4 mr-1" /> View Profile
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(user._id);
                  }}
                  className={
                    likedUsers.has(user._id) 
                      ? "bg-rose-100 border-rose-300 text-rose-600 hover:bg-rose-200" 
                      : "border-gray-200 text-gray-400 hover:bg-rose-50 hover:border-rose-300"
                  }
                  title={likedUsers.has(user._id) ? "Unlike" : "Like"}
                >
                  <Heart className={`w-4 h-4 ${likedUsers.has(user._id) ? "fill-current" : ""}`} />
                </Button>
                
                {userRole === "recruiter" && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(user._id);
                    }}
                    className={
                      bookmarkedUsers.has(user._id) 
                        ? "bg-amber-100 border-amber-300 text-amber-600 hover:bg-amber-200" 
                        : "border-gray-200 text-gray-400 hover:bg-amber-50 hover:border-amber-300"
                    }
                    title={bookmarkedUsers.has(user._id) ? "Remove bookmark" : "Bookmark candidate"}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedUsers.has(user._id) ? "fill-current" : ""}`} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && users.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold">No candidates found</h3>
          <p>Check back later for new talent.</p>
        </div>
      )}
    </div>
  );
};

export default Talent;