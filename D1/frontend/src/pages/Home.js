import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Song } from '../components/Song';
import { PlaylistPreview } from '../components/PlaylistPreview';
import { SearchInput } from '../components/SearchInput';
import { AddSong } from '../components/AddSong';
import { CreatePlaylist } from '../components/CreatePlaylist';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popularSongs: [
        { id: 1, title: 'Save Your Tears', artist: 'The Weeknd', imageUrl: 'https://th.bing.com/th/id/OIP.McrFTtqd5JLrkWY4WtiDlgHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7' },
        { id: 2, title: 'Song 2', artist: 'Artist 2', imageUrl: 'https://th.bing.com/th/id/OIP.McrFTtqd5JLrkWY4WtiDlgHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7' },
        { id: 3, title: 'Song 3', artist: 'Artist 3', imageUrl: 'https://th.bing.com/th/id/OIP.McrFTtqd5JLrkWY4WtiDlgHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7' },
        // ... rest of the songs
      ],
      playlists: [
        { id: 1, name: 'Playlist 1', description: 'Description of Playlist 1', creator: 'User 1', imageUrl: 'https://th.bing.com/th/id' },
        { id: 2, name: 'Playlist 2', description: 'Description of Playlist 2', creator: 'User 2', imageUrl: 'https://th.bing.com/th/id' },
        { id: 3, name: 'Playlist 3', description: 'Description of Playlist 3', creator: 'User 3', imageUrl: 'https://th.bing.com/th/id' },
        // ... rest of the playlists
      ],
      searchResults: {
        songs: [],
        playlists: [],
      },
      showAddSongForm: false,
      showCreatePlaylistForm: false,
    };
  }

  handleSearch = (query, searchType) => {
    const { popularSongs, playlists } = this.state;
    let filteredSongs = [];
    let filteredPlaylists = [];

    if (searchType === 'songs' || searchType === 'both') {
      filteredSongs = popularSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (searchType === 'playlists' || searchType === 'both') {
      filteredPlaylists = playlists.filter(
        (playlist) =>
          playlist.name.toLowerCase().includes(query.toLowerCase()) ||
          playlist.description.toLowerCase().includes(query.toLowerCase()) ||
          playlist.creator.toLowerCase().includes(query.toLowerCase())
      );
    }

    this.setState({
      searchResults: {
        songs: filteredSongs,
        playlists: filteredPlaylists,
      },
    });
  };

  handleAddSong = (newSong) => {
    this.setState((prevState) => ({
      popularSongs: [...prevState.popularSongs, newSong],
      showAddSongForm: false,
    }));
  };

  handleCreatePlaylist = (newPlaylist) => {
    this.setState((prevState) => ({
      playlists: [...prevState.playlists, newPlaylist],
      showCreatePlaylistForm: false,
    }));
  };

  toggleAddSongForm = () => {
    this.setState((prevState) => ({
      showAddSongForm: !prevState.showAddSongForm,
    }));
  };

  toggleCreatePlaylistForm = () => {
    this.setState((prevState) => ({
      showCreatePlaylistForm: !prevState.showCreatePlaylistForm,
    }));
  };

  render() {
    const { popularSongs, playlists, searchResults, showAddSongForm, showCreatePlaylistForm } = this.state;
    const displaySongs = searchResults.songs.length > 0 ? searchResults.songs : popularSongs;
    const displayPlaylists = searchResults.playlists.length > 0 ? searchResults.playlists : playlists;

    return (
      <React.Fragment>
        <Header />
        <div className="home-container">
          <SearchInput onSearch={this.handleSearch} />
          <div className="action-buttons">
            <button className="add-song-button" onClick={this.toggleAddSongForm}>Add Song</button>
            <button className="create-playlist-button" onClick={this.toggleCreatePlaylistForm}>Create Playlist</button>
          </div>
          {showAddSongForm && <AddSong onAddSong={this.handleAddSong} />}
          {showCreatePlaylistForm && <CreatePlaylist onCreatePlaylist={this.handleCreatePlaylist} />}
          <section className="song-feed">
            <h2 className="section-title">Popular Songs This Week</h2>
            <ul className="song-list">
              {displaySongs.map((song) => (
                <li key={song.id} className="song-item">
                  <Song song={song} />
                </li>
              ))}
            </ul>
          </section>
          <section className="playlist-feed">
            <h2 className="section-title">Playlist Feed</h2>
            <ul className="playlist-list">
              {displayPlaylists.map((playlist) => (
                <li key={playlist.id} className="playlist-item">
                  <PlaylistPreview playlist={playlist} />
                </li>
              ))}
            </ul>
          </section>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export { Home };
