import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

class Playlists extends React.Component {
    constructor(props) {
        super(props);
      }
  render() {
    return (
      <React.Fragment>
        <Header />
        <h1>Hello, Playlists Page!</h1>

        <Footer/>
      </React.Fragment>
    );
  }
}

export { Playlists };
