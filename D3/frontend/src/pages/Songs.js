import React from 'react';
import { Header } from '../components/Header';

class Songs extends React.Component {
    constructor(props) {
        super(props);
      }
  render() {
    return (
      <div>
        <Header/>
        <h1>Hello, Songs Page!</h1>

      </div>
    );
  }
}

export { Songs };
