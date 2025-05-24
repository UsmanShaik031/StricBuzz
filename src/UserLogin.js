import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button as MUIButton } from '@mui/material';
import img1 from './1.jpg';

import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import img7 from './7.jpg';
import img8 from './8.jpg';
import img9 from './9.jpg';
import img10 from './10.jpg';
import img11 from './11.jpg';

const profileImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

const UserLogin = ({ email, password, setEmail, setPassword, onSubmit, error }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#ffffff"
      width="100vw"
      minHeight="100vh"
    >
      {/* Logo */}
      <img
        src="/assets/logos.png"
        alt="Logo"
        style={{
          width: '120px',
          marginBottom: '16px',
        }}
      />

      {/* Login Box */}
      <Box
        width="350px"
        padding="32px"
        bgcolor="white"
        borderRadius="12px"
        textAlign="center"
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />

        {error && (
          <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
            {error}
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={2}>
          <label>
            <input type="checkbox" style={{ marginRight: '6px' }} />
            Remember me
          </label>
          <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
        </Box>

        <MUIButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSubmit}
          style={{ backgroundColor: '#002244', color: 'white', fontWeight: 'bold' }}
        >
          LOGIN
        </MUIButton>
      </Box>

      {/* Circle Profile Image Carousel */}
      <Box
        mt={4}
        mb={2}
        width={120}
        height={120}
        borderRadius="50%"
        overflow="hidden"
        boxShadow="0 0 10px rgba(0,0,0,0.15)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={profileImages[currentImageIndex]}
          alt={`Profile ${currentImageIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.5s ease-in-out',
          }}
          key={currentImageIndex}
        />
      </Box>

      {/* Stricbuzz Branding */}
      <Typography
        variant="h6"
        style={{
            marginTop:'8px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          color: '#002244',
        }}
      >
        StricBuzz
      </Typography>
    </Box>
  );
};

export default UserLogin;
