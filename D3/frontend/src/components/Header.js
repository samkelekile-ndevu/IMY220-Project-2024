import React from 'react';
import { Link, useParams } from 'react-router-dom';


class Header extends React.Component {
  render() {
    // const userId = 1; // You can hardcode the default user id here or pass it as a prop
    
    return (
      <nav className="navContainer">
        <div className="logo-container">
          <img
            src="https://th.bing.com/th?id=OIP.Z1OHRp0krATHeINoNBxCHAHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            alt="Logo"
          />
          <h1>Melodia</h1>
        </div>
        <ul className="navbar">
          <li>
            <Link to="/home">
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>
          <li>
            {/* Link to profile with dynamic user ID */}
            {/* <Link to={`/profile/${userId}`}>
              <i className="fa fa-user"></i> Profile
            </Link> */}

            <Link to={`/profile`}>
              <i className="fa fa-user"></i> Profile
            </Link>

          </li>
        </ul>
      </nav>
    );
  }
}

export { Header };
