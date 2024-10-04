import React from 'react';
import { ProfilePreview } from '../components/ProfilePreview';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Temporary array of users data
const usersArr = [
  {
    id: 1,
    username: 'user01',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    username: 'user02',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    username: 'user03',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    username: 'user04',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    username: 'user05',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    username: 'user06',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    username: 'user07',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    username: 'user08',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

class Users extends React.Component {
  onViewProfile = (userId) => {
    // Redirect to profile page for the clicked user
    this.props.router.navigate(`/profile/${userId}`);
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="users-container">
          <h1>Users</h1>
          <div className="users-list">
            {usersArr.map((user) => (
              <ProfilePreview
                key={user.id}
                profile={user}
                onViewProfile={this.onViewProfile}
              />
            ))}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export { Users };
