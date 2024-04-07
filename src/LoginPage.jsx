import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Correct usage of useNavigate

  const handleLogin = () => {
    // Here you can implement your authentication logic, for example, sending the username and password to a server
    // For this example, I'll just do a simple check
    if (username === 'admin' && password === 'password') {
      // Successful login
      console.log('Login successful');
      onLogin(); // Call the onLogin function passed from the parent component
      navigate('/create'); // Redirect to the home page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
