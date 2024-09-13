import React from 'react';
import { withRouter } from '../withRouter'; // to access route params

class Profile extends React.Component {
  constructor(props) {
    super(props);

    // Example user data (this could later be fetched based on the `id`)
    this.state = {
      user: {
        id: 1,
        name: 'John Doe',
        username: 'user01',
        pronouns: 'He/Him',
        bio: 'Something about me.',
        socialLinks: {
          twitter: 'https://twitter.com/user01',
          instagram: 'https://instagram.com/user01',
        },
        friends: ['Friend 1', 'Friend 2', 'Friend 3'],
        playlists: [
          { id: 1, name: 'My Playlist 1', description: 'Description for Playlist 1', imageUrl: '' },
          { id: 2, name: 'My Playlist 2', description: 'Description for Playlist 2', imageUrl: '' },
        ],
        savedPlaylists: [
          { id: 1, name: 'Saved Playlist 1', createdBy: 'User XYZ', imageUrl: '' },
          { id: 2, name: 'Saved Playlist 2', createdBy: 'User ABC', imageUrl: '' },
        ],
      },
    };
  }

  componentDidMount() {
    const { id } = this.props.router.params; // Access dynamic route `id`
    console.log(`Fetched profile data for user ID: ${id}`);

    // Placeholder: In a real app, you would fetch user data based on the `id`
    // Example: fetch(`/api/users/${id}`).then(response => this.setState({ user: response.data }))
  }

  render() {
    const { user } = this.state;

    return (
      <div className="profile-page">
        <header>
          <h1>{user.name}</h1>
          <p>Username: {user.username}</p>
          <p>Pronouns: {user.pronouns}</p>
          <p>Bio: {user.bio}</p>
          <div className="social-links">
            <a href={user.socialLinks.twitter}>Twitter</a>
            <a href={user.socialLinks.instagram}>Instagram</a>
          </div>
          <button>Edit Profile</button>
        </header>

        <section className="friends-section">
          <h2>My Friends</h2>
          <ul>
            {user.friends.map((friend, index) => (
              <li key={index}>{friend}</li>
            ))}
          </ul>
        </section>

        <section className="playlists-section">
          <h2>My Playlists</h2>
          <button>Create Playlist</button>
          <div className="playlists">
            {user.playlists.map((playlist) => (
              <div key={playlist.id} className="playlist">
                <img src={playlist.imageUrl || 'https://via.placeholder.com/150'} alt={playlist.name} />
                <h3>{playlist.name}</h3>
                <p>{playlist.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="saved-playlists-section">
          <h2>Saved Playlists</h2>
          <div className="playlists">
            {user.savedPlaylists.map((playlist) => (
              <div key={playlist.id} className="playlist">
                <img src={playlist.imageUrl || 'https://via.placeholder.com/150'} alt={playlist.name} />
                <h3>{playlist.name}</h3>
                <p>Created by: {playlist.createdBy}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Profile);
