import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import 'materialize-css/dist/css/materialize.min.css';
import WebSocketComponent from './websocketClient';

const LoginPage = ({ onLogin ,progress }) => {
  const [userid, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState({})
  const navigate = useNavigate();
  const handleMessageSocket = (message) => {
    console.log('Login successful', message);
    progress(100)
    onLogin();
    console.log("progress set to 100")
    if (message["usename"]!=="None"){
      localStorage.setItem("username",message['username'])
      localStorage.setItem("userid",message['userid'])
    }else{
      setError("invalid username or password")
    }
  };
  const handleLogin = (event) => {
    if (username !== '' && password !== '') {
      console.log("click event working... ")
      setMessage({ 'auth': 'auth', 'username': username, 'password': password })
      console.log(message)
    } else {
      setError('Invalid username or password');
    }
  };
  useEffect(() => {
    if (message.username && message.password) {
      console.log('Handling message:', message);
    }
  }, [message]);

  return (
    <div className='container'>
      <WebSocketComponent handleMessage={handleMessageSocket} message={message} />
      <div className='form'>
        <div className='head'>
          <h4 className='h4'>Login</h4>
        </div>
        <div>
          <label>User Id:</label>
          <input type="number" value={userid} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className='btn button waves-effect waves-light' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
