import React, { useState, useRef } from "react";
import { Box, Typography, Avatar, Divider } from '@mui/material';
import Navbar from "./Navbar";
import Footer from "./Footer";
import './Squads.css';

const PlayerInfo = ({ name, role, align = 'left' }) => (
  
  <Box textAlign={align}>
    <Typography variant="body2" fontWeight={500}>
      {name}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {role}
    </Typography>
  </Box>
);

const Squads = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
    const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
    const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
    const coinRef = useRef(null);
const handleLogout = () => {
  localStorage.removeItem('authenticated'); // Remove persisted auth
  window.location.reload(); // Reload to reflect the logout state (optional)
};

  const leftPlayers = [
   
    { id: 2, name: 'Kareem S(WK)', role: 'WK-Batter', img: '/images/1.jpg' },
    { id: 3, name: 'Hari A (C)', role: 'Batter', img: '/images/2.jpg' },
    { id: 4, name: 'Ummar S', role: 'Bowler', img: '/images/3.jpg' },
     { id: 1, name: 'Abbu S', role: 'Batter', img: '/images/7.jpg' },
    { id: 5, name: 'Ujair S', role: 'Bowler', img: '/images/10.jpg' },
    { id: 6, name: 'Amaanulla S (Sub)', role: 'Batter', img: '/images/9.jpg' },
  ];

  const rightPlayers = [{ 
    id: 4, name: 'Arshad S(WK)', role: 'WK-Batter', img: '/images/8.jpg' },
    { id: 1, name: 'Niyaz S(C)', role: 'Batter', img: '/images/6.jpg' },
    { id: 2, name: 'Usman S', role: 'Bowler', img: '/images/4.jpg' },
    
    { id: 3, name: 'Muthaheer S', role: 'Batter', img: '/images/5.jpg' },
    { id: 5, name: 'Rizwan S', role: 'Bowler', img: '/images/11.jpg' },
    { id: 6, name: 'Amaanulla S (Sub)', role: 'Batter', img: '/images/9.jpg' },
  ];

  return (
    <div 
    ><Navbar
  drawerOpen={drawerOpen}
  setDrawerOpen={setDrawerOpen}
  heads={heads}
  tails={tails}
  setHeads={setHeads}
  setTails={setTails}
  ml={20}
  coinRef={coinRef}
  onLogout={handleLogout}
   style={{ width: '100%',marginLeft:'29px', marginRight:'-10px'}}
/>

   <Box
className="squads-container"
>
  {/* Team Headers with VS */}
 <Box ml={3}>
  {/* Top Center Title */}
  <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3.5} ml={1}>
    Playing XI
  </Typography>

  {/* Team Names Row */}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 3,
      ml: '3px',
      width: '260px',
    }}
  >
    {/* Fire Team */}
     <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <img src="/assets/storm.gif" alt="Storm" width="30" height="30" style={{ marginRight: 8 }} />
      <Typography variant="h6" fontWeight="bold" color="primary">
        Storm
      </Typography>
    </Box>
    

    {/* Optional center area */}
    <Typography variant="h6" fontWeight="bold" color="text.secondary">
      {/* Empty or add vs here */}
    </Typography>

    {/* Storm Team */}
   <Box sx={{ display: 'flex', alignItems: 'center' ,gap:0.5}}>
      <img src="/assets/fire.gif" alt="Fire" width="30" height="30" style={{  marginLeft:-10}} />
      <Typography variant="h6" fontWeight="bold" color="error">
        Fire
      </Typography>
    </Box>
  </Box>
</Box>


  {/* Teams Player Lists */}
  <Box
    sx={{
      width:'110%',
      ml:'-9px',
      border:'none',
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      justifyContent: 'space-between',
    }}
  >
    {/* Left Team */}
    <Box sx={{ flex: 1, marginLeft:'23px' }}>
      {leftPlayers.map((player, index) => (
        <Box key={player.id}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
            <Avatar alt={player.name} src={player.img} sx={{ width: 32, height: 32 }} />
            <PlayerInfo name={player.name} role={player.role} align="left" />
          </Box>
          {index !== leftPlayers.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>

    {/* Right Team */}
    <Box sx={{ flex: 1 }}>
      {rightPlayers.map((player, index) => (
        <Box key={player.id}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1.5,
              py: 1,
            }}
          >
            <PlayerInfo name={player.name} role={player.role} align="right" />
            <Avatar alt={player.name} src={player.img} sx={{ width: 32, height: 32 }} />
          </Box>
          {index !== rightPlayers.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  </Box>

</Box>
 <div className="footer">
          <p style={{marginTop:'14px', marginBottom:'10px'}}>  </p>
        </div>
        <Footer/>
    </div>
    
  );
};

export default Squads;
