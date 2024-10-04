import React from 'react';

class AddSongToPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: '',
      songIndex: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Implement the logic to add the song to the selected playlist here
    console.log('Adding song to playlist:', this.state.selectedPlaylist, this.state.songIndex);
  };

  render() {
    const { selectedPlaylist, songIndex } = this.state;
    const { playlists } = this.props; // Assuming playlists are passed as props

    return (
      <div>
        <h2>Add Song to Playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="selectedPlaylist">Select Playlist:</label>
            <select
              id="selectedPlaylist"
              name="selectedPlaylist"
              value={selectedPlaylist}
              onChange={this.handleChange}
              required
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="songIndex">Song Index:</label>
            <input
              type="number"
              id="songIndex"
              name="songIndex"
              value={songIndex}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Add Song</button>
        </form>
      </div>
    );
  }
}

export { AddSongToPlaylist };
