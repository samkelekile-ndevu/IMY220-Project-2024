import React from 'react';
import { ProfilePreview } from '../components/ProfilePreview';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [usersArr, setUsersArr] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate(); // Use the hook to get the navigate function

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const onViewProfile = (userId) => {
    // Redirect to profile page for the clicked user
    navigate(`/profile/${userId}`); // Use navigate from the hook
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const data = await response.json();
      setUsersArr(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="users-container">
        <h1>Users</h1>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <div className="users-list">
          {usersArr.map((user) => (
            <ProfilePreview
              key={user._id}
              profile={user}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export { Users };
