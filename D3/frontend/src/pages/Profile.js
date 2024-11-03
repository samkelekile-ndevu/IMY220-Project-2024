import { Header } from '../components/Header';
import { ProfilePreview } from '../components/ProfilePreview';
import { Footer } from '../components/Footer';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { PlaylistPreview } from '../components/PlaylistPreview';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const [currentUserFriends, setCurrentUserFriends] = useState([]); 
  const [friendRequests, setFriendRequests] = useState([]); 
  const navigate = useNavigate(); // Use the hook to get the navigate function
  const { id: userId } = useParams();
  const currentUserId = localStorage.getItem('uId');

  useEffect(() => {
    fetchUserProfile();
  }, [userId, currentUserId]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !userId) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      const userData = await response.json();
      setUser(userData);

      const currentUserResponse = await fetch(`http://localhost:5000/users/${currentUserId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!currentUserResponse.ok) throw new Error('Failed to fetch current user');
      const currentUserData = await currentUserResponse.json();

      // Fetch full friend data (with username) for displaying on UI
      const friendsData = await Promise.all(
        currentUserData.friends.map(friendId => 
          fetch(`http://localhost:5000/users/${friendId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(res => res.json())
        )
      );
      setCurrentUserFriends(friendsData);

      // Fetch friend requests
      const requestsResponse = await fetch(`http://localhost:5000/users/me/requests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json();
        setFriendRequests(requestsData);
      }

      // Fetch playlists
      const playlistsPromises = userData.playlists.map(playlistId =>
        fetch(`http://localhost:5000/playlists/${playlistId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => res.json())
      );

      const playlists = await Promise.all(playlistsPromises);
      categorizePlaylists(playlists, userData.username);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  const categorizePlaylists = (playlists, userName) => {
    const myPlaylistsArr = playlists.filter(playlist => playlist.creator.username === userName);
    const savedPlaylistsArr = playlists.filter(playlist => playlist.creator.username !== userName);

    setMyPlaylists(myPlaylistsArr);
    setSavedPlaylists(savedPlaylistsArr);
  };

  //SEND FRIEND REQUEST
  const handleSendFriendRequest = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/friend-requests`, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUserId })
      });

      if (response.ok) {
        alert("Friend request sent");
      } else {
        alert("Failed to send friend request");
      }
    } catch (err) {
      console.error("Error sending friend request:", err);
    }
  };

  //ACCEPT
  const handleAcceptRequest = async (friendId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/users/${friendId}/accept-requests`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });      

      if (response.ok) {
        // Remove the accepted friend request and refresh friends list
        setFriendRequests(friendRequests.filter(req => req.senderId !== friendId));
        fetchUserProfile(); // Refresh user profile to update friends list
        alert("Friend request accepted");
      } else {
        alert("Failed to accept friend request");
      }
    } catch (err) {
      console.error("Error accepting friend request:", err);
    }
  };

  //UNFRIEND
  const handleUnfriend = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/unfriend`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        alert("Unfriended successfully");
        // Optionally refresh the profile data to update the UI
        fetchUserProfile();
      } else {
        alert("Failed to unfriend");
      }
    } catch (err) {
      console.error("Error unfriending:", err);
    }
  };
  
  //GOTO PROFILE
  const onViewProfile = (userId) => {
    // Redirect to profile page for the clicked user
    navigate(`/profile/${userId}`); // Use navigate from the hook
  };

  //GET MUTUAL FRIENDS
  const getMutualFriends = () => {
    return currentUserFriends.filter(friend => user.friends.includes(friend._id));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="profile-page">
        <h1>Profile Page</h1>
        <header>
          <img src={user.profileImage || 'https://www.svgrepo.com/show/408476/user-person-profile-block-account-circle.svg'} alt={`${user.username}'s profile`} />
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <p><strong>Joined:</strong> {new Date(user.dateCreated).toLocaleDateString()}</p>
          {user._id === currentUserId ? (
            <button>Edit Profile</button>
          ) : currentUserFriends.some(friend => friend._id === user._id) ? (
            <button onClick={handleUnfriend}>Unfriend</button>
          ) : friendRequests.some(req => req.senderId === userId) ? (
            <button disabled>Friend request sent</button>
          ) : (
            <button onClick={handleSendFriendRequest}>Add Friend</button>
          )}
        </header>

        <section className="friends-section">
          <h2>{user._id === currentUserId ? 'My Friends' : 'Mutual Friends'}</h2>
          <div className="users-list">
            {(user._id === currentUserId ? currentUserFriends : getMutualFriends()).map((friend, index) => (
                <ProfilePreview
              key={index}
              profile={friend}
              onViewProfile={onViewProfile}
            />
            ))}
          </div>
        </section>

        <section className="playlists-section">
          {user._id === currentUserId ? (
              <h2>User Playlists</h2>
            ) : (
              <h2>Own Playlists</h2>
            )}
          
          <ul className="playlist-list">
            {myPlaylists.map((playlist) => (
              <li key={playlist._id} className="playlist-item">
                <PlaylistPreview playlist={playlist} />
                <Link to={`/playlist/${playlist._id}`}>View Playlist</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="saved-playlists-section">
          <h2>Saved Playlists</h2>
          <ul className="playlist-list">
            {savedPlaylists.map((playlist) => (
              <li key={playlist._id} className="playlist-item">
                <PlaylistPreview playlist={playlist} />
                <Link to={`/playlist/${playlist._id}`}>View Playlist</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="friend-requests-section">
          <h2>Friend Requests</h2>
          <ul>
            {friendRequests.map((req,index) => (
              <li key={index}>
                {req.username} 
                <button onClick={() => handleAcceptRequest(req._id)}>Accept</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export { Profile };
