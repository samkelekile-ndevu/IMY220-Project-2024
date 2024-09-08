import React from 'react';

class PlaylistPreview extends React.Component {
    constructor(props) {
        super(props);
      }
  render() {
    const { playlist } = this.props; // Assuming playlist data is passed as props
    return (
      <div className="playlist-preview">
      {playlist.imageUrl && <img src={playlist.imageUrl} alt={playlist.name} />}
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>
      <p>Created by: {playlist.creator}</p>
      <p>Last updated: {playlist.updatedOn}</p>
      <button onClick={() => this.props.onPlay(playlist.id)}>Play</button>
    </div>
    );
  }
}

export { PlaylistPreview };