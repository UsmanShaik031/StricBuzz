import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const images = [
  { src: '/assets/I1.jpg', orientation: 'landscape', id: 'i1', description: 'Cool Moments', info: 'This moment captures the calm before the storm, when the energy of the game is about to burst into life. A perfect memory frozen in time.' },
  { src: '/assets/I2.jpg', orientation: 'landscape', id: 'i2', description: 'Players Warming Up', info: 'Players engage in warm-up drills, stretching and practicing their reflexes, preparing both physically and mentally for the match ahead.' },
  { src: '/assets/I4.jpg', orientation: 'landscape', id: 'i4', description: 'Intense Gameplay', info: 'A gripping moment of the game when the stakes were high and every move counted. Spectators held their breath as strategies unfolded.' },
  { src: '/assets/I6.jpg', orientation: 'landscape', id: 'i6', description: 'Venue', info: 'An immaculate venue with perfect pitch conditions and lively crowd energy made it an ideal setting for the showdown.' },
  { src: '/assets/I22.jpg', orientation: 'landscape', id: 'i22', description: 'Stadium Cool', info: 'A panoramic shot of the packed stadium reflecting the grandeur and excitement of live cricket entertainment.' },
  { src: '/assets/I3.jpg', orientation: 'portrait', id: 'i3', description: 'On Same Team', info: 'Teammates huddle in solidarity, showcasing unity and planning their approach with fierce determination and mutual respect.' },
  { src: '/assets/I5.jpg', orientation: 'portrait', id: 'i5', description: 'Pitch Action', info: 'A thrilling delivery captured mid-air as the bowler unleashes pace and precision aimed at unsettling the batsman.' },
  { src: '/assets/I7.jpg', orientation: 'portrait', id: 'i7', description: 'Batting Stance', info: 'The batsman steadies himself with focus, anticipating the next delivery, showcasing grit and confidence in stance.' },
  { src: '/assets/I8.jpg', orientation: 'portrait', id: 'i8', description: 'Celebration Time', info: 'A joyous outburst after a pivotal moment — whether a wicket or a boundary — capturing the raw emotion of the sport.' },
  { src: '/assets/I9.jpg', orientation: 'portrait', id: 'i9', description: 'Team Huddle', info: 'A quick huddle to reinforce team spirit and strategies, highlighting the role of unity in the pursuit of victory.' },
];

const Snaps = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [visible, setVisible] = useState({});
  const refs = useRef([]);
 const [drawerOpen, setDrawerOpen] = useState(false);
    const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
    const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
    const coinRef = useRef(null);
const handleLogout = () => {
  localStorage.removeItem('authenticated'); // Remove persisted auth
  window.location.reload(); // Reload to reflect the logout state (optional)
};
  useEffect(() => {
    refs.current = refs.current.slice(0, images.length);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisible(v => ({ ...v, [index]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
   <div>
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
     <Box sx={{ px: 3, py: 4 ,   marginTop: '70px',}}>
      <Typography variant="h5" fontWeight="bold" mb={4} color="#2c3e50" sx={{marginLeft:'24px'}}>
          Be Cool 😎 during SPL
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: isMobile ? 6 : 10,
          gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
        }}
      >
        {images.map((item, index) => {
          const isFromLeft = index % 2 === 0;
          const isVisible = visible[index];

          return (
            <Box key={index}>
              <Box
                component="img"
                src={item.src}
                alt={`Snap ${index + 1}`}
                loading="lazy"
                data-index={index}
                ref={el => (refs.current[index] = el)}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 8,
                  boxShadow: '0 3px 12px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                  objectFit: 'contain',
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible
                    ? `${isFromLeft ? 'slideFromLeft' : 'slideFromRight'} 0.7s ease forwards`
                    : 'none',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    transform: 'scale(1.03)',
                  },
                  gridColumn: !isMobile && item.orientation === 'landscape' ? 'span 2' : 'span 1',
                }}
              />
              <Typography
                variant="h6"
                mt={1.5}
                color="text.primary"
                sx={{ textAlign: 'center', fontWeight: 600 }}
              >
                {item.description}
              </Typography>
              <Typography
                variant="body1"
                mt={0.5}
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                  maxWidth: 600,
                  mx: 'auto',
                  px: 1,
                }}
              >
                {item.info}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <style>{`
        @keyframes slideFromLeft {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideFromRight {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
    <Footer/>
   </div>
  );
};

export default Snaps;
