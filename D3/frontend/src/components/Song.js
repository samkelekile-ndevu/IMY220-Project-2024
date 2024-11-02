import React from 'react';

class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { imageUrl, artist, title } = this.props.song;

    return (
      <div className="song-item">
        <img src={imageUrl} alt={title} />
        <div className="song-details">
          <h4>{title}</h4>
          <p>{artist}</p>
        </div>
      </div>
    );
  }
}

export { Song };
