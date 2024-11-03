import React from 'react';
import { Link } from 'react-router-dom';

class SplashPage extends React.Component {
  render() {
    return (
      <div className="splash-container" style={{ backgroundImage: "url('../assets/images/PngtreeBg.jpg')" }}>
        <div className="overlay">
          <div className="logo-container">
            <img src="https://th.bing.com/th?id=OIP.Z1OHRp0krATHeINoNBxCHAHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="website logo" className="logo" />
            <h1 className="website-name">Melodia</h1>
          </div>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/signup" className="auth-button">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export { SplashPage };
