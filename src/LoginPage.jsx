import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Card, CardHeader, Icon, IconButton } from '@mui/material';
import { Box } from '@mui/material'
import { Button, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { MyContext } from './components/Connection';
import { Brightness1, Brightness4, Brightness7 } from '@mui/icons-material';
import {Paper} from '@mui/material';

const LoginPage = ({preference }) => {
  console.log(preference)
  const [click,setClick]=useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const { socket, response } = useContext(MyContext)
  useEffect(() => {
    if (socket != null) {
      socket.onmessage = (msg) => {
        console.log("in login page", msg.data)
        localStorage.setItem('login', msg.data);
        if (msg.data != null) {
          let data = JSON.parse(msg.data)
          if (data.user_id !== "None") {
            if (data.usermode === "A")
              navigate("/existing")
          }else{
            setError("enter a valid username and password")
          }
        }
      }
    }
    return () => {
      if (socket) {
        socket.onmessage = null;
      }
    }
  }, [socket])

  const handleLogin = (event) => {
    if (username !== '' && password !== '') {
      console.log("click event working... ")
      if (socket != null) {
        socket.send(JSON.stringify(
          {
            'auth': 'auth',
            'username': username,
            'password': password
          }
        ))
      } else {
        console.log("socket is null...")
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "primary"
    }}>
      <Card
        sx={{ mb: 2, width: "40%", padding: "0px", margin: "5px" }}
      >
        <CardHeader
          sx={{ color: "primary.black", height: "100%", margin: "1px", display: "flex", justifyContent: "center" }}
          title={"Login"}
          action={<IconButton 
            onClick={(eve)=>{
              setClick(!click)
              preference()
            }}
          >
            {
              click?(<Brightness4/>):(<Brightness7/>)
            }
          </IconButton>}
        >
          <Typography variant='h3' sx={{ alignItems: "center", width: "100%", color: "primary.dark" }}>login</Typography>
        </CardHeader>
        <CardContent sx={{ margin: "20px" }}>
          <TextField label="Enter the username" type='text' sx={{ margin: "10px", width: "100%" }} value={username} onChange={(e) => setUsername(e.target.value)}>

          </TextField>
          <TextField label="Enter your password" type='password' sx={{ margin: "10px", width: "100%" }} value={password} onChange={(e) => setPassword(e.target.value)}>

          </TextField>
        </CardContent>
        <CardActions>
          <Button variant='contained' onClick={handleLogin} sx={{ width: "100%", bgcolor: "primary.dark", color: "primary.white" }}>
            LOGIN
          </Button>
        </CardActions>
        {error && <div style={{ color: 'red', textAlign: "center" }}>{error}
          <IconButton>
            <Icon>
              <Brightness1/>
            </Icon>
          </IconButton>
          </div>}
      </Card>

    </Box>
  );
};

export default LoginPage;
