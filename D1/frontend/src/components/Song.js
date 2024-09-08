import React from 'react';

class Song extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    const { id ,title, artist, addedOn, imageUrl } = this.props;

    return (
      <div className="song-item">
      <div className="song-info">
        <p>{title}</p>
        <p>{artist}</p>
        <p>Added on: {addedOn}</p>
      </div>
      <div className="song-preview">
        <img src={imageUrl} alt={title} />
        <div className="song-details">
          <h4>{title}</h4>
          <p>{artist}</p>
        </div>
        <div className="song-actions">
          <button onClick={() => previewSong(id)}>PREVIEW</button>
          <button onClick={() => addToPlaylist(id)}>+</button>
          <button onClick={() => playSong(id)}>
            <i className="fa fa-play"></i>
          </button>
        </div>
      </div>
    </div>
    );
  }
}

export { Song };