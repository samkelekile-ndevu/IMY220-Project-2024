import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); // Changed to email since your API uses email for login
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true); // Start loading

    // Fetch API call for login
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      setLoading(false); // End loading

      if (response.ok) {
        // Save the JWT token (if the API responds with one)
        localStorage.setItem('token', data.token);
        localStorage.setItem('uID', data.id);
        // Redirect to the home page
        navigate('/home');
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoading(false); // End loading
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export { Login };
