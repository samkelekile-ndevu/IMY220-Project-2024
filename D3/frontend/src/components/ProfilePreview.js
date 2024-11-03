import React from 'react';

class ProfilePreview extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-preview">
        <img src={profile.profileImage} alt={profile.username} />
        <h2>{profile.username}</h2>
        <button onClick={() => this.props.onViewProfile(profile._id)}>View User</button>
      </div>
    );
  }
}

export { ProfilePreview };
