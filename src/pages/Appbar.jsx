import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Tab, Tabs, TextField, IconButton, Menu, MenuItem, Popover } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext } from 'react';
import { MyContext } from '../components/Connection';
import { useState } from 'react';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function Appbar({ preference }) {
  const { response } = useContext(MyContext)
  const [tab, setTab] = useState()
  const [searchInput,setsearchInput]=useState('')
  const [mode,setMode] = useState(false)
  const navigateTo = useNavigate()
  console.log(preference);
  const tabs = [
    {
      label: 'Existing',
      onclick: () => {
        setTimeout(() => {
          console.log("navigating...");
          navigateTo('existing');
        }, 1000);
      }
    },
    {
      label: 'Issued',
      onclick: () => {
        setTimeout(() => {
          console.log("navigating...");
          navigateTo('issued');
        }, 1000);
      }
    },
    {
      label: 'Pending',
      onclick: () => {
        setTimeout(() => {
          console.log("navigating...");
          navigateTo('pending');
        }, 1000);
      }
    },
    {
      label: 'Review',
      onclick: () => {
        setTimeout(() => {
          console.log("navigating...");
          navigateTo('review');
        }, 1000);
      }
    },
  ];
  const [selectedTab, setSelectedTab] = React.useState(0);
  const login = JSON.parse(localStorage.getItem('login'));
  console.log(login)
  const handleMode=()=>{
    setMode(!mode);
    console.log("mode changed ..");
    preference()
  }
  const handleChange = (event, newIndex) => {
    setSelectedTab(newIndex);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handleSearchOpen = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleSearchClose = () => {
    setAnchorEl2(null);
  };

  return (
    <AppBar position="relative">
      <Toolbar sx={{ width: "100%", bgcolor: "secondary", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <div style={{ width: "100%", display: 'flex', flexDirection: 'row' }}>
          <Typography variant='p' noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' , color:'#ff1'}}}>
            Tranvancore Cements
          </Typography>
          <Typography sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>Welcome {login['username']}</Typography>

        </div>
        <Tabs textColor='secondary' sx={{ width: '100%',background:'secondary' }} indicatorColor='secondary' value={selectedTab} TabIndicatorProps={{
          style: { color: 'secondary' }, 
        }} onChange={handleChange}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              sx={{color:"white"}}
              onClick={() => {
                setSelectedTab(index);
                tab.onclick();
              }}
            />
          ))}
        </Tabs>

        <div style={{ width: "fit-content", display: 'flex', flexDirection: 'row' }}>
        <IconButton color="inherit" aria-label="Account" aria-haspopup="menu" onClick={handleMode}>
            {mode?(<Brightness4/>):(<Brightness7/>)}
          </IconButton>
          
          <Popover
            id='100'
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical:'bottom',
              horizontal:'center'
            }}
            sx={{borderRadius:"10px"}}
            open={Boolean(anchorEl2)}
            onClose={handleSearchClose}
          >
            <TextField
              value={searchInput}
              onChange={(eve)=>{
                setsearchInput(eve.currentTarget.value)
              }}
              sx={{margin:1}}
              label={"search Activities here"}
            >

            </TextField>
          </Popover>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={() => {
              setTimeout(() => {
                console.log("navigating...");
                navigateTo('History');
              }, 1000);
            }}>History</MenuItem>
            <MenuItem onClick={handleMenuClose}>logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
