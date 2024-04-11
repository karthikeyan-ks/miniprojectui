import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Tab, Tabs, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Search } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Appbar({ navigateTo, progress }) {
  const tabs = [
    {
      label: 'Existing', content: <p>Content for Tab 1</p>, onclick: () => {
        progress(100)
        setTimeout(() => {
          console.log("navigating...")
          navigateTo('existing')
          progress(0)
        }, 1000)
      }
    },
    {
      label: 'Issued', content: <p>Content for Tab 2</p>, onclick: () => {
        progress(100)
        setTimeout(() => {
          console.log("navigating...")
          navigateTo('issued')
          progress(0)
        }, 1000)
      }
    },
    {
      label: 'Pending', content: <p>Content for Tab 3</p>, onclick: () => {
        progress(100)
        setTimeout(() => {
          console.log("navigating...")
          navigateTo('pending')
          progress(0)
        }, 1000)
      }
    },
    {
      label: 'Review', content: <p>Content for Tab 3</p>, onclick: () => {
        progress(100)
        setTimeout(() => {
          console.log("navigating...")
          navigateTo('review')
          progress(0)
        }, 1000)
      }
    },
  ];
  const [selectedTab, setSelectedTab] = React.useState(0)
  const handleChange = (event, newIndex) => {
    setSelectedTab(newIndex);
  };
  const [anchorEl, setAnchorEl] = React.useState(null); // State for menu anchor
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("1 clicked...")
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen2 = (event) => {
    console.log("2 clicked...")
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };
  const handleMenuOpen3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleMenuClose3 = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant='p' noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
          Tranvancore Cements
        </Typography>
        <Tabs value={selectedTab} onChange={handleChange}>
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              label={tab.label}
              content={tab.content}
              onClick={() => {
                progress(100); // Update progress state (assuming it's used for loading)
                setTimeout(() => {
                  console.log("navigating...");
                  navigateTo(tab.label.toLowerCase()); // Use tab label for navigation
                  progress(0);
                }, 1000);
              }}
            />
          ))}
        </Tabs>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="Account"
            ria-haspopup="true"
            >
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Search"
            aria-haspopup="true"
            onClick={handleMenuOpen2}
          >
            <Search />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="more options"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
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
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl2)}
            onClose={handleMenuClose2}
          >
            <MenuItem ><TextField placeholder='search'/></MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Appbar;
