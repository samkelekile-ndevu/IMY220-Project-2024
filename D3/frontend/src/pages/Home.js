import React from 'react';
import { Link } from 'react-router-dom';
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
      songs: [],
      playlists: [],
      searchResults: {
        songs: [],
        playlists: [],
      },
      showAddSongForm: false,
      showCreatePlaylistForm: false,
    };
    
  }

  componentDidMount() {
    this.fetchSongs();
    this.fetchPlaylists();
  }

  // componentDidUpdate() {
  //   this.fetchSongs();
  //   this.fetchPlaylists();
  // }

  fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:5000/songs');
      if (!response.ok) throw new Error('Failed to fetch songs');
      const data = await response.json();
      console.log("Fetched songs:", data); // Log fetched songs
      this.setState({ songs: data });
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };
  
  fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:5000/playlists');
      if (!response.ok) throw new Error('Failed to fetch playlists');
      const data = await response.json();
      console.log("Fetched playlists:", data); // Log fetched playlists
      this.setState({ playlists: data });
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };
  

  handleSearch = (query, searchType) => {
    const { songs, playlists } = this.state;
    const filteredSongs = searchType === 'songs' || searchType === 'both'
      ? songs.filter(song => song.title.toLowerCase().includes(query.toLowerCase()) || song.artist.toLowerCase().includes(query.toLowerCase()))
      : [];
    const filteredPlaylists = searchType === 'playlists' || searchType === 'both'
      ? playlists.filter(playlist => playlist.name.toLowerCase().includes(query.toLowerCase()) || playlist.description.toLowerCase().includes(query.toLowerCase()))
      : [];

    this.setState({
      searchResults: {
        songs: filteredSongs,
        playlists: filteredPlaylists,
      },
    });
  };

  handleAddSong = (newSong) => {
    this.setState(prevState => ({
      songs: [...prevState.songs, newSong],
      showAddSongForm: false,
    }));
  };

  handleCreatePlaylist = (newPlaylist) => {
    this.setState(prevState => ({
      playlists: [...prevState.playlists, newPlaylist],
      showCreatePlaylistForm: false,
    }));
  };

  toggleAddSongForm = () => {
    this.setState(prevState => ({ showAddSongForm: !prevState.showAddSongForm }));
  };

  toggleCreatePlaylistForm = () => {
    this.setState(prevState => ({ showCreatePlaylistForm: !prevState.showCreatePlaylistForm }));
  };

  render() {
    const { songs, playlists, searchResults, showAddSongForm, showCreatePlaylistForm } = this.state;
    const displaySongs = searchResults.songs.length > 0 ? searchResults.songs : songs;
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
            <h2 className="section-title">Songs Feed</h2>
            <ul className="song-list">
              {displaySongs.map((song) => (
                <li key={song._id} >
                  <Song song={song} className="song-item"/>
                </li>
              ))}
            </ul>
          </section>
          <section className="playlist-feed">
            <h2 className="section-title">Playlist Feed</h2>
            <ul className="playlist-list">
              {displayPlaylists.map((playlist) => (
                <li key={playlist._id} className="playlist-item">
                  <PlaylistPreview playlist={playlist} onPlay={() => {}} />
                  <Link to={`/playlist/${playlist._id}`}>View Playlist</Link>
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
