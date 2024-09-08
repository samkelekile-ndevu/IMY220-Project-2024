import React from 'react';
import { Header } from '../components/Header';

class Playlists extends React.Component {
    constructor(props) {
        super(props);
      }
  render() {
    return (
      <div>
        <Header/>
        <h1>Hello, Playlists Page!</h1>

      </div>
    );
  }
}

export { Playlists };
