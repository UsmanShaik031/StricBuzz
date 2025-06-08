import React, { useState} from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
  GlobalStyles, Divider
} from '@mui/material';
import Footer from './Footer';
import { FcGoogle } from 'react-icons/fc'; // Colored Google icon
import { signOut } from "firebase/auth";
import FacebookIcon from '@mui/icons-material/Facebook';
import { Visibility, VisibilityOff, Email, Lock} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

import { setPersistence, browserLocalPersistence } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { sendEmailVerification } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase'; // ensure correct path
import { sendPasswordResetEmail } from 'firebase/auth';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';


const inputStyle = {
  mb: 2,
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#b39ddb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7b1fa2',
    },
  },
  '& input': {
    padding: '10px 14px',
  },
};

const UserLogin = () => {

  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  // const [error, setError] = useState('');
 
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleCloseSnackbar = () => setShowSnackbar(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
// const [showSnackbar, setShowSnackbar] = React.useState(false);

const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success');
const variants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: 20,
    scale: 0.9,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    rotateX: -15,
    scale: 0.9,
    filter: 'blur(3px)',
    transition: {
      duration: 0.45,
      ease: 'easeInOut',
    },
  },
};

 

// Inside the UserLogin component
const navigate = useNavigate();

const handleAuth = async () => {
  if (!email || !password) {
    setSnackbarSeverity('error');
    setSnackbarMessage('Please fill in all required fields.');
    setSnackbarOpen(true);
    return;
  }

  try {
    // Set persistence to local storage to ensure auth state is saved properly
    await setPersistence(auth, browserLocalPersistence);

    if (tab === 'login') {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await user.reload();

      if (!user.emailVerified) {
        setSnackbarSeverity('warning');
        setSnackbarMessage('Please verify your email before logging in.');
        setSnackbarOpen(true);
        return;
      }

      setSnackbarSeverity('success');
      setSnackbarMessage('Login successful!');
      setSnackbarOpen(true);

      navigate('/home');
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      await user.reload(); // force refresh user info before verification email

      await sendEmailVerification(user);
   setSnackbarSeverity('success');
      setSnackbarMessage('Registration successful! A verification email has been sent.');
      setSnackbarOpen(true);
      // Small delay to ensure Firebase updates internal auth state
      await new Promise(res => setTimeout(res, 500));

      // Sign out immediately after signup
      await signOut(auth);

      setSnackbarSeverity('success');
      setSnackbarMessage('Registration successful! A verification email has been sent.');
      setSnackbarOpen(true);
      
      // Optional: switch to login tab and clear input fields after signup
      setTab('login');
      setEmail('');
      setPassword('');
    }
  } catch (err) {
    console.error("Authentication error:", err);
    setSnackbarSeverity('error');
    setSnackbarMessage(err?.message || "An error occurred during authentication.");
    setSnackbarOpen(true);
  }
};



  const handleSendResetEmail = async () => {
  if (!email) {
    setSnackbarMessage("Please enter your email.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    setSnackbarMessage("Password reset email sent successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setForgotPasswordMode(false);
  } catch (err) {
    setSnackbarMessage(err.message);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  }
};




  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          width: '400px',        // set desired fixed width
          maxWidth: '90vw',      // responsive max width for smaller screens
          zIndex: 13000,
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Alert
        
          variant="filled"
          onClose={handleCloseSnackbar}
          sx={{ width: '100%', fontSize: '1rem', px: 2, py: 1 }}
          action={
            <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
      
        </Alert>
      </Snackbar>
    <Snackbar
  open={snackbarOpen}
  autoHideDuration={4000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: (theme) => theme.zIndex.modal + 10000, // VERY high z-index
    pointerEvents: 'auto',
    // Full opaque solid background so nothing behind is visible
    bgcolor: '#2c3e50', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  }}
>
  <Alert
    onClose={() => setSnackbarOpen(false)}
    severity={snackbarSeverity}
    variant="filled"
    sx={{
      width: '100%',
      color: '#fff',
      backgroundColor: '#2c3e50',
      fontWeight: 'normal',
      fontSize: '1rem',
      borderRadius: 0,
      opacity: 1,       // No transparency
      pointerEvents: 'auto',
      userSelect: 'none',
      boxShadow: 'none',
    }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>
<Snackbar
  open={snackbarOpen}
  autoHideDuration={4000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: (theme) => theme.zIndex.modal + 10000,
    pointerEvents: 'auto',
    bgcolor: '#2c3e50',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  }}
>
  <Alert
    onClose={() => setSnackbarOpen(false)}
    severity={snackbarSeverity}
    variant="filled"
    sx={{
      width: '100%',
      color: '#fff',
      backgroundColor: '#2c3e50',
      fontWeight: 'bold',
      fontSize: '1rem',
      borderRadius: 0,
      opacity: 1,
      pointerEvents: 'auto',
      userSelect: 'none',
      boxShadow: 'none',
    }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

      <GlobalStyles styles={{
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        '@keyframes rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        '@keyframes moveX': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(30px)' }
        },
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
          '50%': { transform: 'scale(1.3)', opacity: 0.2 }
        }
      }} />

      <Box
        sx={{
          minHeight: '100vh',
          background: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* Auth Toggle Button */}
        <Box sx={{ position: 'fixed', top: 35, right: 30, zIndex: 9999 }}>
          {/* Site Title + Description on Left */}
        <Box
  sx={{
    position: 'fixed',
    top: 20,
    left: 5,
    zIndex: 9999,
    userSelect: 'none',
    backgroundColor: 'transparent',
    p: 1,
    borderRadius: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  }}
>
  {/* Text Block: Logo, Title, Subtitle */}
  <Box 
    >
    {/* Logo + Title */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 ,}}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          fontSize: '1.9rem',
          lineHeight: 1.3,
          color: '#c74859',
        }}
      >
        🏏𝐒𝐭𝐫𝐢𝐜𝐁𝐮𝐳𝐳
      </Typography>
    </Box>

    {/* Subtitle */}
    <Typography
      variant="body2"
      sx={{
        fontWeight: 500,
        fontSize: '0.9rem',
        mt: 0.5,
        ml: 0.5,
        opacity: 0.8,
        color: 'black',
      }}
    >
      Best Street Cricket Experience Ever
    </Typography>
  </Box>

  {/* Video on the right */}
  <Box
    component="video"
    src="/assets/Wicket out.mp4" // Replace with your actual transparent video path
    autoPlay
    loop
    muted
    playsInline
    sx={{
      mt:-2
,      width: 118,
      height: 118,
      objectFit: 'contain',
    }}
  />
</Box>



          {/* Auth Toggle Button below on Right */}
          <Box
            sx={{
              position: 'fixed',
              top: 70,      // ~30px + height of title+desc (adjust if needed)
              right: 30,
              zIndex: 9999,
            }}
          >

          </Box>

        </Box>


        {/* Snackbar */}


        {/* Full-Page Background Shapes */}
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          {[...Array(25)].map((_, i) => {
            const size = Math.floor(Math.random() * 20 + 10);
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const color = ['#b388ff', '#7c4dff', '#b2dfdb', '#f8bbd0', '#e1bee7'][i % 5];
            const anim = ['float', 'rotate', 'moveX', 'pulse'][i % 4];
            const dur = Math.random() * 10 + 5;

            return (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  backgroundColor: color,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: 0.2,
                  animation: `${anim} ${dur}s ease-in-out infinite`,
                }}
              />
            );
          })}
        </Box>

        {/* Auth Card */}
        <AnimatePresence mode="wait">
        <motion.div
  key={tab}
  variants={variants}
  initial="hidden"
  animate="visible"
  exit="exit"
  style={{
    width: '100%',
    maxWidth: 360,
    zIndex: 1,
    boxShadow: 'none',
    borderRadius: '12px',
    background: 'transparent',
    transformStyle: 'preserve-3d',
  }}
>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                mt: -9,
                borderRadius: 5,
                backgroundColor: 'none',
                backdropFilter: 'blur(25px)',
                boxShadow: 'none',
                textAlign: 'center',
              }}

            >
              <Typography variant="h5" fontWeight="bold" mb={2}mt={5}>
                {tab === 'login' ? 'Welcome Back' : 'Create Account'}
              </Typography><Button
                variant="text"
                disableRipple
                onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
                sx={{
                  fontWeight: 'bold',
                  color: '#7b1fa2',
                  fontSize: '1.1rem',
                  mb: '10px',
                  textTransform: 'uppercase',
                  '&:hover': { textDecoration: 'none' },
                }}
              >
                {tab === 'login' ? 'Click to SIGN UP' : 'Click to SIGN IN'}
              </Button>



              <TextField
                fullWidth
                placeholder="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={inputStyle}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={inputStyle}
                 autoComplete="new-password" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />




              {tab === 'login' && !forgotPasswordMode && (
                <Box textAlign="right" width="100%" mb={2}>
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => setForgotPasswordMode(true)}
                  >
                    Forgot?
                  </Typography>
                </Box>
              )}


              {forgotPasswordMode && (
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={inputStyle}
                     autoComplete="off"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      mt: -1,
                      mb: 1
                      , display: 'flex',
                      alignItems: 'center',
                      ml: 1,
                      gap: 2,
                    }}
                  >
                    <Button
                      size="small"
                      sx={{
                        color: '#757575', // medium gray
                        fontWeight: 500,
                        cursor: 'pointer',
                        borderRadius: 20,
                        px: 3,
                        py: 0.6,
                        textTransform: 'none', // lowercase as typed
                        fontSize: '0.8rem',
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          color: '#4caf50',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          boxShadow: 'none',
                        },
                        userSelect: 'none',
                      }}
                      onClick={handleSendResetEmail}
                    >
                      Send reset email
                    </Button>

                    {/* Vertical divider */}
                    <Box
                      sx={{
                        width: '1px',
                        height: 20,
                        backgroundColor: '#ccc',
                        mx: 1,
                      }}
                    />

                    <Typography
                      variant="caption"
                      onClick={() => setForgotPasswordMode(false)}
                      sx={{
                        color: '#757575',
                        fontWeight: 500,
                        cursor: 'pointer',
                        borderRadius: 20,
                        px: 2,
                        py: 0.6,
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: '#4caf50',
                        },
                        userSelect: 'none',
                        fontSize: '0.8rem',
                        textTransform: 'none',
                      }}
                    >
                      Cancel
                    </Typography>
                  </Box>

                </Box>
              )}




              <Button
                variant="contained"
                onClick={handleAuth} // ✅ Updated this line
                sx={{
                  mt: 1,
                  background: 'linear-gradient(to right, #7b1fa2, #512da8)',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: 30,
                  py: 1.2,
                  width:'150px',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  boxShadow: '0px 6px 15px rgba(123, 31, 162, 0.3)',
                }}
              >
                {tab === 'login' ? 'Sign In' : 'Sign Up'}
              </Button>
   <Box
      sx={{
        border: 'none',
        borderRadius: 2,
        padding: 2,
        textAlign: 'center',
        maxWidth: 400,
        margin: 'auto',
        backgroundColor: 'transparent',
      }}
    >
      {/* Divider with text in center */}
      <Box display="flex" alignItems="center" mb={2}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography sx={{ mx: 2, color: '#888' }} variant="body2">
          or Sign In with
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      {/* Social Buttons */}
      <Box display="flex" justifyContent="center" gap={2}>
        <Button
          variant="outlined"
        startIcon={<FcGoogle />} 
          sx={{
            textTransform: 'none',
            backgroundColor: '#f1f6ff',
            borderRadius: 2,
            borderColor: '#e0e0e0',
            color: '#000', // keep text black
            width: 120,
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        >
          Google
        </Button>

        <Button
          variant="outlined"
          startIcon={<FacebookIcon sx={{ color: '#1877F2' }} />}
          sx={{
            textTransform: 'none',
            backgroundColor: '#f1f6ff',
            borderRadius: 2,
            borderColor: '#e0e0e0',
            color: '#1877F2', // Facebook blue text
            width: 120,
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        >
          Facebook
        </Button>
      </Box>
    </Box>
            </Paper>
          </motion.div>
        </AnimatePresence>
      </Box>
       <div style={{marginTop:'-195px'}}><Footer/></div>
    
{/*   
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize: '0.9rem',
          mt: -12,
          ml: 16,
          mb: 2,
          opacity: 0.8,
          color: 'black'
        }}
      >
        &copy; {new Date().getFullYear()} All rights reserved
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize: '0.9rem',
          ml: 16,
          mb: 2,
          opacity: 0.8,
          color: 'black'
        }}
      >
         StricBuzz by Usman Shaik ヅ
      </Typography> */}
    </>
  );
};

export default UserLogin;
