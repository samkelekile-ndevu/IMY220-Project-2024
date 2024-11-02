import React from 'react';

class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, description, creator, coverImage } = this.props.playlist;

    return (
      <div className="playlist-preview">
        {coverImage && <img src={coverImage} alt={name} />}
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Created by: {creator}</p>
        <button onClick={() => this.props.onPlay(id)}>Play</button>
      </div>
    );
  }
}

export { PlaylistPreview };
