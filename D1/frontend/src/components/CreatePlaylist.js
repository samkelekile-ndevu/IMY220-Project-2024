import React from 'react';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      playlistDescription: '',
      playlistCoverImage: null,
    };
  }

  handleNameChange = (event) => {
    this.setState({ playlistName: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ playlistDescription: event.target.value });
  };

  handleImageChange = (event) => {
    this.setState({ playlistCoverImage: event.target.files[0] });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Validate input fields (e.g., check if name and description are not empty)

    // Get current date and time
    const currentDate = new Date();

    // Create a new playlist object
    const newPlaylist = {
      name: this.state.playlistName,
      description: this.state.playlistDescription,
      coverImage: this.state.playlistCoverImage,
      dateCreated: currentDate.toISOString(),
      lastUpdated: currentDate.toISOString(),
    };

    // Call the onCreatePlaylist function to create the playlist
    this.props.onCreatePlaylist(newPlaylist);

    // Reset form fields
    this.setState({
      playlistName: '',
      playlistDescription: '',
      playlistCoverImage: null,
    });
  };

  render() {
    const { playlistName, playlistDescription, playlistCoverImage } = this.state;

    return (
      <div className="create-playlist-form">
        <h2>Create New Playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="playlistCoverImage">Upload Playlist Cover Image:</label>
            <input
              type="file"
              id="playlistCoverImage"
              name="playlistCoverImage"
              onChange={this.handleImageChange}
            />
            {playlistCoverImage && (
              <p>Selected image: {playlistCoverImage.name}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="playlistName">Playlist Name:</label>
            <input
              type="text"
              id="playlistName"
              name="playlistName"
              value={playlistName}
              onChange={this.handleNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="playlistDescription">Description:</label>
            <textarea
              id="playlistDescription"
              name="playlistDescription"
              value={playlistDescription}
              onChange={this.handleDescriptionChange}
              required
            ></textarea>
          </div>
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    );
  }
}

export { CreatePlaylist };
