import React from 'react';

class Playlist extends React.Component {
  render() {
    const { id } = this.props.match.params; // Get the playlist ID from the URL

    return (
      <div className="playlist-page">
        <h1>Playlist Page</h1>
        <p>Displaying playlist for ID: {id}</p>
        {/* Add your playlist details here */}
        <div className="playlist-details">
          <h2>Playlist Name</h2>
          <p>Description: This is a great playlist.</p>
          <p>Created by: User XYZ</p>
        </div>
      </div>
    );
  }
}

export {Playlist};
