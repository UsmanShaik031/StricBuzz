// src/Navbar.js
import React, { useState} from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,ListItemIcon,
  ListItemText,  Divider,
  Typography,
  AppBar,  Collapse,
  Toolbar,
  Box,
  Button as MUIButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NoteIcon from '@mui/icons-material/Note';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import RestoreIcon from '@mui/icons-material/Restore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const Navbar = ({
  drawerOpen,
  setDrawerOpen,
  heads,
  tails,
  setHeads,
  setTails,
  coinRef,
  onLogout, // new prop callback to notify parent about logout
}) => {  
  const [emailOpen, setEmailOpen] = useState(false);

  const resetGame = () => {
    if (coinRef?.current) coinRef.current.style.animation = 'none';
    setHeads(0);
    setTails(0);
  };

  const menuItems = [
    { title: 'Score board', desc: 'Showing scores and rankings.' },
    { title: 'Squads', desc: 'Manage your teams and members.' },
    { title: 'Points table', desc: 'Current points and statistics.' },
    { title: 'Teams', desc: 'Overview of all teams.' },
  ];
const navigate = useNavigate();
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Commentary', path: '/commentary' },
  { label: 'Scoreboard', path: '/scoreboard' },
  { label: 'PointsTable', path: '/pointstable' },
  { label: 'Squads', path: '/squads' }
];
  return (
    <>
      <AppBar position="static" style={{ background: 'white' }}>
        <Toolbar>
          <IconButton edge="start" sx={{ color: 'black' }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>



<div
  className="custom-navbar"
  style={{
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    padding: '10px 0',
    borderBottom: 'none',
    scrollbarWidth: 'none',
  }}
>
  {navItems.map(({ label, path }) => (
    <div
      key={label}
      onClick={() => navigate(path)}
      style={{
        padding: '8px 16px',
        fontWeight: window.location.pathname === path ? 'bold' : 'normal',
        color: 'black',
        borderBottom:
          window.location.pathname === path ? '3px solid #d32f2f' : '3px solid transparent',
        fontSize: '16px',
        cursor: 'pointer',
        flexShrink: 0,
        transition: '0.3s ease',
      }}
    >
      {label}
    </div>
  ))}
</div>


        </Toolbar>
      </AppBar>

      <Drawer anchor="left"  open={drawerOpen} onClose={() => setDrawerOpen(false)} > 
        <Box width={300} padding={2} ml={-2}>
          <Box mt={-1} mb={1} pb={1} style={{ borderBottom: '4px solid rgba(0, 0, 0, 0.1)' }}>
            <Box display="flex" alignItems="center" gap={1} pl={1}>
              <MenuIcon style={{ color: '#333' }} />
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  fontWeight: 'bold',
                  textAlign: 'left',
                  padding: '4px 0',
                  borderRadius: 4,
                  display: 'inline-block',
                  marginTop: '7px',
                }}
              >
                Menu
              </Typography>
            </Box>
          </Box>

      <List component="nav" sx={{ px: 2, pt: 2 }}>
  {/* Main Navigation */}
  <ListItem button>
    <ListItemIcon><PersonIcon /></ListItemIcon>
    <ListItemText primary="Profile" />
  </ListItem>
   <ListItem button>
    <ListItemIcon><SettingsIcon /></ListItemIcon>
    <ListItemText primary="Settings" />
  </ListItem>
  <ListItem button>
    <ListItemIcon><DashboardIcon /></ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItem>

  <ListItem button>
    <ListItemIcon><NotificationsIcon /></ListItemIcon>
    <ListItemText primary="Notifications" />
  </ListItem>

  
</List>

{/* Divider between nav and settings */}
<Box sx={{ borderTop: '1px solid #ccc', mx: 2, my: 2 }} />

{/* Profile & Settings */}
<List sx={{ px: 2 }}>
  

 

  {/* Game Stats */}
  <ListItem>
    <ListItemText
      primary={`Total Flips: ${heads + tails}`}
      primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem' }}
    />
  </ListItem>
  <ListItem>
    <ListItemText
      primary={`Heads: ${heads}`}
      primaryTypographyProps={{ fontSize: '0.85rem' }}
    />
  </ListItem>
  <ListItem>
    <ListItemText
      primary={`Tails: ${tails}`}
      primaryTypographyProps={{ fontSize: '0.85rem' }}
    />
  </ListItem>

  {/* Spacer */}
  <Box sx={{ flexGrow: 1 }} />

  {/* Action Buttons */}
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
<MUIButton
  variant="outlined"
  onClick={resetGame}
   sx={{
    fontWeight: 600,
    height:'45px',
    width:'105px',
    textTransform: 'none',
    fontSize: '0.85rem', // smaller text
    borderRadius: '14px', // slightly less rounded
    py: 1,                // less vertical padding
    px: 1.5,              // less horizontal padding
    color: '#4a3aff',
    background: 'linear-gradient(white, white) padding-box, linear-gradient(145deg, #4a3aff, #624eff) border-box',
    border: '2px solid transparent',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: '0 4px 6px rgba(98, 78, 255, 0.2)', // smaller shadow
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: 'black',
      color: '#fff',
      boxShadow: '0 6px 10px rgba(98, 78, 255, 0.4)',
    },
  }}
>
    Clear Stats
  </MUIButton>

<MUIButton
  variant="outlined"
 onClick={() => {
  localStorage.removeItem('authenticated');
  if (onLogout) onLogout(); // optional callback to parent
  navigate('/'); // or to '/login' if you have a login route
  window.location.reload(); // optional: force refresh if app doesn't handle auth state reactively
}}

  
  endIcon={<ArrowForwardIcon />}
  sx={{
    fontWeight: 600,
    height:'45px',
    width:'105px',
    textTransform: 'none',
    fontSize: '0.85rem', // smaller text
    borderRadius: '14px', // slightly less rounded
    py: 1,                // less vertical padding
    px: 1.5,              // less horizontal padding
    color: 'white',
    background: 'linear-gradient(145deg,rgb(206, 68, 68),rgb(221, 72, 72)) border-box',
    border: '2px solid transparent',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    boxShadow: '0 4px 6px rgba(98, 78, 255, 0.2)', // smaller shadow
    transition: 'all 0.3s ease-in-out',
  }}
>
  Logout
</MUIButton>


</Box>

</List>

        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
