import React from 'react';

class ProfilePreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-preview">
        <img src={profile.imageUrl} alt={profile.username} />
        <h2>{profile.username}</h2>
        <p>Pronouns: {profile.pronouns}</p>
        <button onClick={() => this.props.onViewProfile(profile.id)}>View Profile</button>
      </div>
    );
  }
}

export { ProfilePreview };
