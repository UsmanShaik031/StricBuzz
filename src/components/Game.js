import React, { useRef,useState} from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

import { getAuth, signOut } from 'firebase/auth';
const CricketRealGame = () => {
        const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
        const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
        const [drawerOpen, setDrawerOpen] = useState(false);
        const coinRef = useRef(null);
        const handleLogout = async () => {
          const auth = getAuth();
          await signOut(auth);
        };
  return (
    <Box>
   <Navbar
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        heads={heads}
        tails={tails}
        setHeads={setHeads}
        setTails={setTails}
        coinRef={coinRef}
        onLogout={handleLogout}
      />
      <Box
        sx={{
          marginTop: '30px',
          minHeight: '110vh',
          background: `
            radial-gradient(circle at top right, rgba(0,255,255,0.05), rgba(0,0,0,0.95)),
            linear-gradient(to bottom right, #0f111a, #151a27, #000814)
          `,
          py: 6,
          px: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#FFF',
        }}
      >
        {/* How to Play */}
        <Box
          sx={{
            maxWidth: 800,
            width: '100%',
            mb: 4,
            px: { xs: 2, md: 4 },
            py: 3,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            🎮 How to Play
          </Typography>
          <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
            <li>Tap or click to swing the bat as the ball approaches.</li>
            <li>Aim to score runs by timing your hits—watch out for obstacles!</li>
            <li>Game is fully playable on **mobile portrait** and desktop.</li>
          </ul>
        </Box>

        {/* Embedded Cricket Gunda */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            height: { xs: 400, md: 600 },
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            mb: 4,
          }}
        >
          <iframe
            src="https://zv1y2i8p.play.gamezop.com/g/BkzmafyPqJm"
            title="Cricket Gunda"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            seamless="seamless"
            allow="autoplay; fullscreen"
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default CricketRealGame;
