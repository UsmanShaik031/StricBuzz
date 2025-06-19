import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
const CricketRealGame = () => {
 

  return (
<div>
    <Navbar/>
<Box
  sx={{
    marginTop: '30px',
    minHeight: '110vh',
    background: `
      radial-gradient(circle at top right, rgba(0, 255, 255, 0.1), rgba(0, 0, 0, 0.95)),
      linear-gradient(to bottom right, #0f111a, #151a27, #000814)
    `,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    py: 4,
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#ffffff',
  }}
>


      {/* Instructions */}
 <Box
  sx={{
    maxWidth: 810,
    textAlign: 'left',
    mb: 4,
    px: 3,
    py: 3,
    borderRadius: 3,
  
   
    color: '#ffffff',
  }}
>
  <Typography variant="h5" fontWeight="bold" gutterBottom>
    🎮 How to Play
  </Typography>

  <Typography variant="body1" gutterBottom>
    Welcome to <strong>Cricket Legends</strong> — an immersive cricket experience packed with action!
  </Typography>

  <Box component="ul" sx={{ pl: 3, mt: 1 }}>
    <li>
      <Typography variant="body2">
        <strong>Tap or Click</strong> when the ball is close to your bat to swing.
      </Typography>
    </li>
    <li>
      <Typography variant="body2">
        <strong>Score Big</strong> by perfectly timing your hits for 4s and 6s.
      </Typography>
    </li>
    <li>
      <Typography variant="body2">
        <strong>Play Anywhere</strong> – optimized for both mobile (portrait) and desktop screens.
      </Typography>
    </li>
  </Box>
</Box>

      {/* Embedded Game */}
      <Box
        sx={{
          width: '105%',
          maxWidth: 810,
          height: 640,
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#fff',
        }}
      >
        <iframe
          src="https://www.gameflare.com/embed/cricket-legends/"
          title="Cricket Legends Game"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          style={{ pointerEvents: 'auto' }} // just to ensure interactivity if needed
        />
      </Box>

      {/* Open in New Tab Button */}


    </Box>
    <Footer/>
</div>
  );
};

export default CricketRealGame;
