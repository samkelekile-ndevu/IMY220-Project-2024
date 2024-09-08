import React from 'react';
import { User } from '../components/User';
import { Header } from '../components/Header';

// Array of users data
const usersArr = [
  
];

class Users extends React.Component {
    constructor(props) {
        super(props);
      }
  render() {
    return (
      <div className="users-container">
        <Header/>
        <h1>Hello, Users Page!</h1>

      </div>
    );
  }
}

export { Users };
