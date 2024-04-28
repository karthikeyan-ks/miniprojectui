import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Tab, Tabs, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Appbar({ navigateTo, progress }) {
  const tabs = [
    {
      label: 'Existing',
      onclick: () => {
        progress(100);
        setTimeout(() => {
          console.log("navigating...");
          navigateTo('existing');
          progress(0);
        }, 1000);
      }
    },
    {
      label: 'Issued',
      onclick: () => {
        progress(100);
        setTimeout(() => {
          console.log("navigating...");
          navigateTo('issued');
          progress(0);
        }, 1000);
      }
    },
    {
      label: 'Pending',
      onclick: () => {
        progress(100);
        setTimeout(() => {
          console.log("navigating...");
          navigateTo('pending');
          progress(0);
        }, 1000);
      }
    },
    {
      label: 'Review',
      onclick: () => {
        progress(100);
        setTimeout(() => {
          console.log("navigating...");
          navigateTo('review');
          progress(0);
        }, 1000);
      }
    },
  ];
  const [selectedTab, setSelectedTab] = React.useState(0);

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

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant='p' noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
          Tranvancore Cements
        </Typography>
        <Tabs value={selectedTab} onChange={handleChange}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              onClick={() => {
                progress(100);
                setSelectedTab(index);
                tab.onclick();
              }}
            />
          ))}
        </Tabs>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" aria-label="Account" aria-haspopup="menu">
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Search" aria-haspopup="menu" onClick={handleMenuOpen}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="more options" aria-haspopup="menu" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
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
              progress(100);
              setTimeout(() => {
                console.log("navigating...");
                navigateTo('History');
                progress(0);
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
