// src/Navbar.js
import React, { } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,ListItemIcon,
  ListItemText,  
  Typography,
  AppBar, 
  Toolbar,
  Box,
  Button as MUIButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; // make sure this is at the top
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

  const resetGame = () => {
    if (coinRef?.current) coinRef.current.style.animation = 'none';
    setHeads(0);
    setTails(0);
  };

const navigate = useNavigate();
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Poll', path: '/Poll' },
  { label: 'Game', path: '/Game' },
  { label: 'Snaps', path: '/snaps' },
  { label: 'Commentary', path: '/commentary' },
  { label: 'Scoreboard', path: '/scoreboard' },
  { label: 'PointsTable', path: '/pointstable' },
  { label: 'Squads', path: '/squads' }
];
  return (
    <>
      <AppBar position="fixed" style={{ background: 'white', zIndex: 1300, top: 0, left: 0, right: 0, }}>

        <Toolbar>
          <IconButton edge="start" sx={{ color: 'black' }} onClick={() => setDrawerOpen(true)}>
            <SettingsIcon />
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
<Drawer
  anchor="left"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  PaperProps={{
    sx: {
    height:'120vh',
    marginTop:'-15px',
      width: 210,
      borderRadius: '0 20px 20px 0',
      overflowX: 'hidden', // Prevent side scroll inside drawer
    },
  }}
  ModalProps={{
    keepMounted: true, // Optional: improves performance on mobile
  }}
>


        <Box width={300} padding={2} ml={-2} borderRadius={40}>
          <Box mt={-1} mb={1} pb={1} style={{ borderBottom: 'none' }}>
         <Box display="flex" alignItems="center" gap={1.5} pl={2} py={1}>
  <SettingsIcon sx={{ color: '#2c3e50', fontSize: 26 }} />
  <Typography
    variant="h6"
    sx={{
      fontWeight: 700,
      color: '#2c3e50',
      fontFamily: "'Segoe UI', sans-serif",
      fontSize: '1.25rem',
      letterSpacing: 0.5,
    }}
  >
    Settings
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
    <ListItemText primary="Edit" />
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
onClick={async () => {
  const auth = getAuth();
  try {
    await signOut(auth); // Firebase logout
    localStorage.removeItem('authenticated'); // optional: if you're using it elsewhere
    if (onLogout) onLogout(); // notify parent if needed
    navigate('/userlogin'); // or wherever your login route is
  } catch (error) {
    console.error('Logout failed:', error);
    // Optionally show a toast/snackbar for error
  }
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
