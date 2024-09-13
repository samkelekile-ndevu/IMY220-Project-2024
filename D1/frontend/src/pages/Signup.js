import React from 'react';

class Signup extends React.Component {
  render() {
    return (
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export { Signup };
