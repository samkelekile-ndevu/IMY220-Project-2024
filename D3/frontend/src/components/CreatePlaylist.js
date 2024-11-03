import React from 'react';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      playlistDescription: '',
      playlistCoverImage: '',
      errorMessage: '',
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

  handleSubmit = async (event) => {
    event.preventDefault();
  
    const { playlistName, playlistDescription, playlistCoverImage } = this.state;
  
    if (!playlistName || !playlistDescription || !playlistCoverImage) {
      this.setState({ errorMessage: 'Please fill in all fields.' });
      return;
    }

    
    
  
    const playlistData = {
      creator: localStorage.getItem("uName"),   //get the username
      name: this.state.playlistName,
      description: this.state.playlistDescription,
      coverImage: "../assets/images/uploads/" + this.state.playlistCoverImage.name,
    };
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/playlists', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlistData),
      });
  
      if (response.ok) {
        const newPlaylist = await response.json();
        this.props.onCreatePlaylist(newPlaylist);
        this.setState({
          playlistName: '',
          playlistDescription: '',
          playlistCoverImage: '',
          errorMessage: '',
        });
      } else {
        const errorData = await response.json();
        this.setState({ errorMessage: errorData.message || 'Error creating playlist.' });
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      this.setState({ errorMessage: 'An error occurred while creating the playlist.' });
    }
  };
  

  render() {
    const { playlistName, playlistDescription, playlistCoverImage, errorMessage } = this.state;

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
              required
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    );
  }
}

export { CreatePlaylist };
