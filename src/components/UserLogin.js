import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import TopHeader from './TopHeader';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Profile images
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img5 from '../images/5.jpg';
import img6 from '../images/6.jpg';
import img7 from '../images/7.jpg';
import img8 from '../images/8.jpg';
import img9 from '../images/9.jpg';
import img10 from '../images/10.jpg';
import img11 from '../images/11.jpg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const profileImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];


const UserLogin = ({email, password, setEmail, setPassword, onSubmit, error, clearError }) => {
  const [tab, setTab] = useState('login');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [showSnackbar, setShowSnackbar] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);
useEffect(() => {
  if (error) setShowSnackbar(true);
}, [error]);

const handleCloseSnackbar = () => {
  setShowSnackbar(false);
  if (clearError) clearError();
};
  const handleFocus = () => {
    if (error && clearError) clearError();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <>

      <TopHeader />
      <Box
  mt={1}
  display="flex"
  justifyContent="center"
  alignItems="center"
  height="calc(60vh - 60px)" // ↓ from 70vh
  px={1}
>

<Snackbar
  open={showSnackbar}
  autoHideDuration={4000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert
    severity="error"
    variant="filled"
    action={
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    }
    sx={{ width: '100%' }}
  >
    {error}
  </Alert>
</Snackbar>

        <Box
          width="100%"
          maxWidth={360}
          bgcolor="none"
          borderRadius={4}
          p={3}
          
          textAlign="center"
        //     style={{
        // borderTopLeftRadius: 200,
        // borderTopRightRadius: 20,
        // }}
        >


          {/* Heading */}
          {/* 🔄 Profile Image Carousel */}
          <Box
            mt={-2}
            mb={-7}
            width={120}
            height={120}
            borderRadius="50%"
            overflow="hidden"
            boxShadow="0 0 10px rgba(0,0,0,0.15)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            // mx="auto"
            ml={"100px"}
          >
            <img
              src={profileImages[currentImageIndex]}
              alt={`Profile ${currentImageIndex + 1}`}
              style={{
                width: '100%',
                height: '110%',
                objectFit: 'cover',
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          </Box>
          {/* Tabs */}
          <Box
            display="flex"
            justifyContent="space-around"
            bgcolor="#F0F0F0"
            borderRadius="30px"
            mt={10}
            mb={-4}
            p={0.5}
          //         style={{
          //   borderTopLeftRadius: 20,
          //   borderTopRightRadius: 20,
          // }}
          >
            <Button
              variant={tab === 'login' ? 'contained' : 'text'}
              onClick={() => setTab('login')}
              sx={{
                borderRadius: '30px',
                textTransform: 'none',
                fontWeight: 600,
                width: '50%',
                bgcolor: tab === 'login' ? '#ffffff' : 'transparent',
                color: tab === 'login' ? '#000' : 'gray',
                boxShadow: tab === 'login' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              Login
            </Button>
            <Button
              disabled // makes the button not clickable
              variant={tab === 'register' ? 'contained' : 'text'}
              sx={{
                borderRadius: '30px',
                textTransform: 'none',
                fontWeight: 600,
                width: '50%',
                bgcolor: tab === 'register' ? '#ffffff' : 'transparent',
                color: tab === 'register' ? 'black' : 'black',
                boxShadow: tab === 'register' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                flexDirection: 'column',
                lineHeight: 1.2,
                cursor: 'not-allowed', // optional: clearer disabled visual
              }}
            >
              Register
              <Typography variant="caption" color="green">
                Coming soon
              </Typography>
            </Button>


          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
      {/* Email Field */}
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        mt={6}
        px={1}
        border="1px solid #ccc"
        borderRadius="12px"
        width="260px"
      >
        <EmailIcon sx={{ color: '#555', mr: 1 }} />
        <TextField
          placeholder="Email Address"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={handleFocus}
        />
      </Box>

      {/* Password Field */}
      <Box
        display="flex"
        alignItems="center"
        mb={1.5}
        px={1}
        border="1px solid #ccc"
        borderRadius="12px"
        width="260px"
      >
        <LockIcon sx={{ color: '#555', mr: 1 }} />
        <TextField
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          onFocus={handleFocus}
        />
        <IconButton onClick={togglePasswordVisibility} size="small">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Box>
    </Box>
          {/* Remember Me / Forgot */}
<Box display="flex" alignItems="center" gap={2} mb={2} ml={4}>


            <FormControlLabel
              control={<Checkbox size="small" style={{marginRight:'-6px'}}/>}
              label={
                <Typography variant="body2" color="textSecondary">Remember me</Typography>
              }
            />
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
              Forgot Password?
            </Typography>
          </Box>

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              bgcolor: '#557A65',
              color: '#fff',
              py: 1.2,
              borderRadius: '12px',
              fontWeight: 600,
              textTransform: 'none',
              mb: 2,
              '&:hover': {
                bgcolor: '#476B57'
              }
            }}
          >
            Login
          </Button>

          {/* Divider */}
          <Box textAlign="center" mb={-2} fontSize="0.9rem" color="gray" mt={2}>
            Or login with
          </Box>

          {/* Social Buttons */}
          <Box display="flex" justifyContent="space-between" gap={2} mb={-2}mt={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FcGoogle />}
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                fontWeight: 500
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FaFacebook color="#1877F2" />}
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                fontWeight: 500
              }}
            >
              Facebook
            </Button>
          </Box>



     <div>     {/* Branding */}
          <Typography
            variant="h6"
            style={{
              marginTop: '42px',
              marginBottom: '-35*px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              color: '#002244',
            }}
          >
            StricBuzz
          </Typography>
          {/* Branding */}
          <Typography
            variant="body2"
            align="center"
            mb={2}
            style={{
              marginTop: '10px',
              marginBottom: '-185px',
              fontWeight: '500',
              letterSpacing: '0.5px',
              color: '#555',
            }}
          >
            © {new Date().getFullYear()}. All rights reserved.
          </Typography>
</div>
        </Box>
      </Box>
    </>
  );
};

export default UserLogin;
