import React from 'react';

class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { song } = this.props;
    console.log("song: " + song);//debug
    
    return (
      <div className="song-item">
        <img src="https://cdn.creazilla.com/icons/3431524/music-icon-md.png" alt={song.title} />
        <div className="song-details">
          <h4>{song.title}</h4>
          <p>{song.artist}</p>
          <button>Add to playlist</button>
        </div>
      </div>
    );
  }
}

export { Song };
