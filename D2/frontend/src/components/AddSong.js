import React from 'react';

class AddSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      addedOn: '',
      imageUrl: '',
      errorMessage: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!this.state.title || !this.state.artist || !this.state.addedOn || !this.state.imageUrl) {
      this.setState({ errorMessage: 'Please fill in all fields.' });
      return;
    }

    // Add song to the website (replace with your actual implementation)
    const newSong = {
      title: this.state.title,
      artist: this.state.artist,
      addedOn: this.state.addedOn,
      imageUrl: this.state.imageUrl,
    };
    this.props.onAddSong(newSong);

    // Reset form
    this.setState({
      title: '',
      artist: '',
      addedOn: '',
      imageUrl: '',
      errorMessage: '',
    });
  };

  render() {
    const { title, artist, addedOn, imageUrl, errorMessage } = this.state;

    return (
      <div className="add-song-form">
        <h2>Add Song</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={artist}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addedOn">Added On:</label>
            <input
              type="date"
              id="addedOn"
              name="addedOn"
              value={addedOn}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={this.handleChange}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Add Song</button>
        </form>
      </div>
    );
  }
}

export { AddSong };