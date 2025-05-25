// src/Navbar.js
import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Box,
  Button as MUIButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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

  const menuItems = [
    { title: 'Score board', desc: 'Showing scores and rankings.' },
    { title: 'Squads', desc: 'Manage your teams and members.' },
    { title: 'Points table', desc: 'Current points and statistics.' },
    { title: 'Teams', desc: 'Overview of all teams.' },
  ];

  return (
    <>
      <AppBar position="static" style={{ background: 'white' }}>
        <Toolbar>
          <IconButton edge="start" sx={{ color: 'black' }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <div className="custom-navbar">
            {['8ball', 'number', 'coin', 'dice'].map((item, index) => {
              const isActive = item === 'coin';
              return (
                <div
                  key={index}
                  className={`nav-item${isActive ? ' active' : ''}`}
                  style={
                    isActive
                      ? {
                          borderBottom: '2px solid #d32f2f',
                          paddingBottom: '4px',
                        }
                      : {}
                  }
                >
                  <div
                    className="icon"
                    style={
                      isActive
                        ? {
                            marginTop: '10px',
                            backgroundColor: '#fce4ec',
                            padding: '4px',
                            borderRadius: '8px',
                            boxShadow: '0 0 4px rgba(211, 47, 47, 0.3)',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
                        : {}
                    }
                  >
                    <img
                      src={`/assets/${item}.png`}
                      alt={item}
                      className="icon-img"
                      style={
                        isActive
                          ? {
                              width: '20px',
                              height: '20px',
                              objectFit: 'contain',
                            }
                          : {}
                      }
                    />
                  </div>
                  <div
                    className="label"
                    style={
                      isActive
                        ? {
                            marginTop: '4.5px',
                            fontSize: '15px',
                          }
                        : {}
                    }
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </div>
                </div>
              );
            })}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box width={300} padding={2}>
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

          <List>
            {menuItems.map(({ title, desc }, index) => (
              <ListItem
                key={index}
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '9px 14px',
                  marginBottom: 16,
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      color: '#155724',
                      backgroundColor: '#d4edda',
                      border: '1px solid #c3e6cb',
                      borderRadius: 4,
                      padding: '2px 8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Coming Soon
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  style={{
                    marginTop: 4,
                    color: '#555',
                    fontSize: '0.85rem',
                    lineHeight: 1.3,
                  }}
                >
                  {desc}
                </Typography>
              </ListItem>
            ))}

            <ListItem style={{ padding: '12px 16px' }}>
              <ListItemText
                primary={`Total Flips: ${heads + tails}`}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            <ListItem style={{ padding: '12px 16px' }}>
              <ListItemText
                primary={`Heads: ${heads}`}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            <ListItem style={{ padding: '12px 16px' }}>
              <ListItemText
                primary={`Tails: ${tails}`}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>

            <ListItem style={{ padding: '12px 16px', marginTop: 12 }}>
              <MUIButton
                variant="contained"
                color="primary"
                fullWidth
                onClick={resetGame}
                style={{
                  width: '45%',
                  marginLeft: '60px',
                  fontWeight: 'bold',
                  padding: '10px 0',
                  boxShadow: '0 4px 10px rgba(0, 123, 255, 0.4)',
                  borderRadius: 6,
                  textTransform: 'none',
                }}
              >
                Clear Stats
              </MUIButton>
            </ListItem>

            <ListItem style={{ padding: '12px 16px' }}>
              <MUIButton
                variant="contained"
                fullWidth
                onClick={() => {
                  localStorage.removeItem('authenticated');
                  if (onLogout) onLogout();
                }}
                style={{
                  width: '45%',
                  backgroundColor: '#f44336',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '10px 0',
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginLeft: '60px',
                }}
              >
                <CloseIcon fontSize="small" />
                Logout
              </MUIButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
