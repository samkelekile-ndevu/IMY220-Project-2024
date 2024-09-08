import React from 'react';
import { Header } from '../components/Header';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const user = props.user || {}; // Default to an empty object if props.user is undefined

    this.state = {
      isEditing: false,
      name: user.name || '',
      username: user.username || '',
      pronouns: user.pronouns || '',
      bio: user.bio || '',
      socialLinks: user.socialLinks || {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      const user = this.props.user || {}; // Default to an empty object if props.user is undefined

      this.setState({
        name: user.name || '',
        username: user.username || '',
        pronouns: user.pronouns || '',
        bio: user.bio || '',
        socialLinks: user.socialLinks || {},
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
    };
    this.props.onEditProfile(updatedUser);

    this.setState({ isEditing: false });
  };

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      name: this.props.user?.name || '',
      username: this.props.user?.username || '',
      pronouns: this.props.user?.pronouns || '',
      bio: this.props.user?.bio || '',
      socialLinks: this.props.user?.socialLinks || {},
    });
  };

  render() {
    const { isEditing, name, username, pronouns, bio, socialLinks } = this.state;

    return (
      <div className="profile-container">
        <Header />
        
        <div className="profile-image">
          {/* Placeholder for profile image */}
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>{name}</h2>
          <p>Username: {username}</p>
          <p>Pronouns: {pronouns}</p>
          <p>Bio: {bio}</p>
          <div className="social-links">
            {Object.keys(socialLinks).length > 0 ? (
              Object.keys(socialLinks).map((key) => (
                <a key={key} href={socialLinks[key]} target="_blank" rel="noopener noreferrer">
                  {key}
                </a>
              ))
            ) : (
              <p>No social links available.</p>
            )}
          </div>
          {isEditing ? (
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={this.handleNameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={this.handleUsernameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pronouns">Pronouns:</label>
                <input
                  type="text"
                  id="pronouns"
                  value={pronouns}
                  onChange={this.handlePronounsChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={this.handleBioChange}
                />
              </div>
              <div className="form-group">
                <label>Social Links:</label>
                {Object.keys(socialLinks).map((key) => (
                  <div key={key} className="social-link-input">
                    <input
                      type="text"
                      name={key}
                      value={socialLinks[key]}
                      onChange={this.handleSocialLinksChange}
                      placeholder={key}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => this.setState({ socialLinks: { ...socialLinks, '': '' } })}
                >
                  Add Social Link
                </button>
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={this.handleCancelEdit}>
                Cancel
              </button>
            </form>
          ) : (
            <button onClick={this.handleEditClick}>Edit Profile</button>
          )}
        </div>
      </div>
    );
  }
}

export { Profile };
