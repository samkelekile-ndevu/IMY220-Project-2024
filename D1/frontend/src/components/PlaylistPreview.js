import React from 'react';

class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, description, creator, imageUrl } = this.props.playlist;

    return (
      <div className="playlist-preview">
        {imageUrl && <img src={imageUrl} alt={name} />}
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Created by: {creator}</p>
        <button onClick={() => this.props.onPlay(id)}>Play</button>
      </div>
    );
  }
}

export { PlaylistPreview };
