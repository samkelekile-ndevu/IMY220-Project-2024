import React from 'react';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      username: props.user.username,
      pronouns: props.user.pronouns,
      bio: props.user.bio,
      socialLinks: props.user.socialLinks || {},
      profilePicture: props.user.profilePicture || null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        name: this.props.user.name,
        username: this.props.user.username,
        pronouns: this.props.user.pronouns,
        bio: this.props.user.bio,
        socialLinks: this.props.user.socialLinks || {},
        profilePicture: this.props.user.profilePicture || null,
      });
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePronounsChange = (event) => {
    this.setState({ pronouns: event.target.value });
  };

  handleBioChange = (event) => {
    this.setState({ bio: event.target.value });
  };

  handleSocialLinksChange = (event) => {
    const { name, value } = event.target;
    this.setState({ socialLinks: { ...this.state.socialLinks, [name]: value } });
  };

  handleProfilePictureChange = (event) => {
    this.setState({ profilePicture: event.target.files[0] });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Validate input fields (e.g., check if name and username are not empty)

    // Update the user profile
    const updatedUser = {
      name: this.state.name,
      username: this.state.username,
      pronouns: this.state.pronouns,
      bio: this.state.bio,
      socialLinks: this.state.socialLinks,
      profilePicture: this.state.profilePicture,
    };
    this.props.onEditProfile(updatedUser);
  };

  render() {
    const { name, username, pronouns, bio, socialLinks, profilePicture } = this.state;

    return (
      <div className="edit-profile-form">
        <h2>Edit Profile</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="profile-picture-upload">
            <label htmlFor="profilePicture">Upload Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={this.handleProfilePictureChange}
            />
            {profilePicture && (
              <p>Selected image: {profilePicture.name}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={this.handleNameChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={this.handleUsernameChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="pronouns">Pronouns:</label>
            <input type="text" id="pronouns" value={pronouns} onChange={this.handlePronounsChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" value={bio} onChange={this.handleBioChange} required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="socialLinks">Social Links:</label>
            <div className="social-links-input">
              <input type="text" id="facebook" name="facebook" value={socialLinks.facebook} onChange={this.handleSocialLinksChange} placeholder="Facebook" />
              <input type="text" id="instagram" name="instagram" value={socialLinks.instagram} onChange={this.handleSocialLinksChange} placeholder="Instagram" />
              {/* Add more social links as needed */}
            </div>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

export { EditProfile };
