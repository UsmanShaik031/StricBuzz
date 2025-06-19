import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const CricketRealGame = () => {
  const openGame = () => {
    window.open('https://www.gameflare.com/online-game/cricket-legends/', '_blank');
  };

  return (
    <Box>
      <Navbar />
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

        {/* Game Preview Card */}
        <Card
          sx={{
            maxWidth: 345,
            bgcolor: '#1e1e2f',
            boxShadow: 5,
            borderRadius: 3,
          }}
        >
          <CardMedia
            component="img"
            height="180"
            image="https://img.gameflare.com/games/2021/09/cricket-legends/cricket-legends.jpg"
            alt="Cricket Legends"
          />
          <CardContent>
            <Typography variant="h6" color="#fff" gutterBottom>
              🏏 Cricket Legends
            </Typography>
            <Typography variant="body2" color="gray">
              Play an exciting cricket match experience. Click the button below to open the game in fullscreen!
            </Typography>
          </CardContent>
          <Button
            onClick={openGame}
            variant="contained"
            color="warning"
            sx={{
              m: 2,
              fontWeight: 'bold',
              bgcolor: '#ff9800',
              '&:hover': { bgcolor: '#f57c00' },
              transition: 'all 0.3s ease',
              boxShadow: '0 0 10px #ff9800',
            }}
          >
            🎮 Play Now
          </Button>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
};

export default CricketRealGame;
