import React from 'react';
import { Header } from '../components/Header';
import {Song} from '../components/Song';
import { PlaylistPreview } from '../components/PlaylistPreview';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popularSongs: [
        { id: 1, title: 'Song 1', artist: 'Artist 1', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 2, title: 'Song 2', artist: 'Artist 2', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 3, title: 'Song 3', artist: 'Artist 3', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 4, title: 'Song 4', artist: 'Artist 4', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 5, title: 'Song 5', artist: 'Artist 5', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 6, title: 'Song 6', artist: 'Artist 6', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 7, title: 'Song 7', artist: 'Artist 7', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 8, title: 'Song 8', artist: 'Artist 8', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 9, title: 'Song 9', artist: 'Artist 9', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
        { id: 10, title: 'Song 10', artist: 'Artist 10', imageUrl: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
      ],
      playlists: [
        { id: 1, name: 'Playlist 1', description: 'Description of Playlist 1', creator: 'User 1' },
        { id: 2, name: 'Playlist 2', description: 'Description of Playlist 2', creator: 'User 2' },
        { id: 3, name: 'Playlist 3', description: 'Description of Playlist 3', creator: 'User 3' },
        { id: 4, name: 'Playlist 4', description: 'Description of Playlist 4', creator: 'User 4' },
        { id: 5, name: 'Playlist 5', description: 'Description of Playlist 5', creator: 'User 5' },
        { id: 6, name: 'Playlist 6', description: 'Description of Playlist 6', creator: 'User 6' },
        { id: 7, name: 'Playlist 7', description: 'Description of Playlist 7', creator: 'User 7' },
        { id: 8, name: 'Playlist 8', description: 'Description of Playlist 8', creator: 'User 8' },
        { id: 9, name: 'Playlist 9', description: 'Description of Playlist 9', creator: 'User 9' },
        { id: 10, name: 'Playlist 10', description: 'Description of Playlist 10', creator: 'User 10' },
      ],
    };
  }

  render() {
    const { popularSongs, playlists } = this.state;

    return (
      <div className="homeContainer">
        <Header />
        <section className="song-feed">
          <h2>Popular Songs This Week</h2>
          <ul>
            {popularSongs.map((song) => (
              <li key={song.id}>
                <Song song={song} />
              </li>
            ))}
          </ul>
        </section>
        <section className="playlist-feed">
          <h2>Playlist Feed</h2>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <PlaylistPreview playlist={playlist} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

export { Home };