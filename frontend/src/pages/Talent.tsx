// Fetch talent data
const fetchTalent = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.get("http://localhost:5000/api/user/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    setTalentData(response.data);
  } catch (error) {
    console.error("Error fetching talent data:", error);
  }
};

useEffect(() => {
  fetchTalent();
}, []);

// Add this to your Talent component
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

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

// Then in your JSX, replace any hardcoded user data with the fetched data
{
  loading ? (
    <div>Loading...</div>
  ) : (
    users.map((user) => (
      <div key={user._id}>
        <h3>{user.fullName}</h3>
        <p>{user.bio}</p>
        {/* Display other user details */}
      </div>
    ))
  )
}