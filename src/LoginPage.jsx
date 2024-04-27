import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import WebSocketComponent from './websocketClient';
import { Card, CardHeader } from 'react-bootstrap';
import { Button, CardActions, CardContent, TextField, Typography } from '@mui/material';

const LoginPage = ({ onLogin, progress }) => {
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
    if (message["usename"] !== "None") {
      localStorage.setItem("username", message['username'])
      localStorage.setItem("userid", message['userid'])
    } else {
      setError("invalid username or password")
    }
  };
  const handleLogin = (event) => {
    if (username !== '' && password !== '') {
      console.log("click event working... ")
      handleMessageSocket(1);
      
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
        <Card
          sx={{ mb: 2, width: "90%", padding: "0px", margin: "5px" }}
        >
          <CardHeader
            sx={{ color: "primary.black", height: "100%", margin: "1px", display: "flex", justifyContent: "center" }}
            title={"login"}
          >
            <Typography variant='h3' sx={{textAlign:"center",color:"primary.dark"}}>login</Typography>
          </CardHeader>
          <CardContent sx={{padding:"20px"}}>
            <TextField label="Enter the username" type='text' sx={{padding:"10px",width:"100%"}} value={username} onChange={(e) => setUsername(e.target.value)}>

            </TextField>
            <TextField label="Enter your password" type='password' sx={{padding:"10px",width:"100%"}} value={password} onChange={(e) => setPassword(e.target.value)}>

            </TextField>
          </CardContent>
          <CardActions>
            <Button onClick={handleLogin} sx={{ width: "100%", bgcolor: "primary.dark", color: "primary.white" }}>
              LOGIN
            </Button>
          </CardActions>
        </Card>
       
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default LoginPage;
