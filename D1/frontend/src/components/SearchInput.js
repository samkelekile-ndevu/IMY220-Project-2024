import React from 'react';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchType: 'both',
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSelectChange = (event) => {
    this.setState({ searchType: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.query, this.state.searchType);
  };

  render() {
    return (
      <div className="search-input">
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          placeholder="Search by artist, song title, or album name"
        />
        <select value={this.state.searchType} onChange={this.handleSelectChange}>
          <option value="both">Both</option>
          <option value="songs">Songs</option>
          <option value="playlists">Playlists</option>
        </select>
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export { SearchInput };
