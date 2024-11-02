import React from 'react';

class EditPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: this.props.playlist.name,
      playlistDescription: this.props.playlist.description,
      playlistImageUrl: this.props.playlist.imageUrl,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Implement the logic to update the playlist (including the image URL) here
    console.log('Updating playlist:', this.state.playlistName, this.state.playlistDescription, this.state.playlistImageUrl);
  };

  render() {
    const { playlistName, playlistDescription, playlistImageUrl } = this.state;

    return (
      <div>
        <h2>Edit Playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="playlistName">Playlist Name:</label>
            <input
              type="text"
              id="playlistName"
              name="playlistName"
              value={playlistName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="playlistDescription">Playlist Description:</label>
            <textarea
              id="playlistDescription"
              name="playlistDescription"
              value={playlistDescription}
              onChange={this.handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="playlistImageUrl">Playlist Image URL:</label>
            <input
              type="text"
              id="playlistImageUrl"
              name="playlistImageUrl"
              value={playlistImageUrl}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

export { EditPlaylist };