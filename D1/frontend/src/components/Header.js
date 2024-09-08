import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav className="navContainer">
        <div className="logo-container">
          <img src='https://via.placeholder.com/100x50?text=LOGO' alt="Logo" />
          <h1>Website Name</h1>
        </div>
        <ul className="navbar">
          <li>
            <Link to="/">
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="fa fa-user"></i> Profile
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export { Header };