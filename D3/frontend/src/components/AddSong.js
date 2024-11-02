import React from 'react';

class AddSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      errorMessage: '',
    };

    // this.handleChange = this.bind(handleChange);
    // this.handleSubmit = this.bind(this.handleSubmit);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //submit
  handleSubmit = async (event) => {
    event.preventDefault();
  
    const { title, artist } = this.state;
    if (!title || !artist) {
      this.setState({ errorMessage: 'Please fill in all fields.' });
      return;
    }
  
    const newSong = { title, artist };
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSong),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        this.setState({ errorMessage: errorData.message || 'Error adding song.' });
        return; // Exit if there's an error
      }
  
      const addedSong = await response.json();
      this.props.onAddSong(addedSong);
      this.setState({ title: '', artist: '', errorMessage: '' });
    } catch (error) {
      console.error("Error adding song:", error);
      this.setState({ errorMessage: 'An error occurred while adding the song.' });
    }
  };  

  render() {
    const { title, artist, errorMessage } = this.state;

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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Add Song</button>
        </form>
      </div>
    );
  }
}

export { AddSong };
