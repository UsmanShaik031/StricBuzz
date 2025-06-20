import React, { useEffect, useRef, useState } from 'react';
import {
    Box, Typography, IconButton, TextField, Button, Grid, Snackbar
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Navbar from './Navbar';
import Footer from './Footer';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const ProfilePage = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [snack, setSnack] = useState(false);
    const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
    const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const coinRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        phone: '',
        team: '',
        playerName: '',
        email: '',
        uid: '',
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        ...data,
                        email: currentUser.email,
                        uid: currentUser.uid,
                    });
                } else {
                    setFormData(prev => ({
                        ...prev,
                        email: currentUser.email,
                        uid: currentUser.uid,
                    }));
                }
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            if (!user) return;
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                ...formData,
                email: user.email,
                uid: user.uid
            });
            setSnack(true);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };


    return (
        <>
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

            <Box sx={{ backgroundColor: 'white', minHeight: '100vh', color: 'black', pt: 10, px: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        mb: 4,
                        p: 2,
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: `'Great Vibes', 'Parisienne', cursive`,
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
                            color: '#2c3e50',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                            letterSpacing: '1.5px',
                        }}
                    >
                        Hi, {formData.name || 'Your Name'}
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            background: 'linear-gradient(to right, #43cea2, #185a9d)',
                            px: 1.8,
                            py: 0.5,
                            borderRadius: '20px',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            color: 'white',
                            letterSpacing: 1,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                            mb:-6
                        }}
                    >
                        🌟 Premium User
                    </Typography>
                </Box>


                <Box
                    sx={{
                        maxWidth: 700,
                        mx: 'auto',
                        backgroundColor: 'white',
                        p: 3,
                        borderRadius: 3,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{ mb: '7%' }}>Your Profile </Typography>
                   <Grid
  container
  spacing={2}
  justifyContent="center"
  sx={{
    borderRadius: '12px',
    padding: 3,
    background: '#f9fafb',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  }}
>
  {/* Disabled Fields */}
  {[
    { label: 'Email', name: 'email', value: formData.email },
    { label: 'User ID (UID)', name: 'uid', value: formData.uid },
  ].map((field, idx) => (
    <Grid item xs={12} key={idx}>
      <TextField
        label={field.label}
        name={field.name}
        value={field.value}
        disabled
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          backgroundColor: '#f1f1f1',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#bbb',
            },
          },
          '& .MuiInputBase-input': {
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            fontSize: '0.95rem',
            color: '#333',
          },
          '& .MuiInputLabel-root': {
            color: '#666',
            fontWeight: 500,
          },
        }}
      />
    </Grid>
  ))}

  {/* Editable Fields */}
  {[
    { label: 'Full Name', name: 'name' },
    { label: 'Date of Birth', name: 'dob', type: 'date', inputProps: { shrink: true } },
    { label: 'Phone Number', name: 'phone' },
    { label: 'Team Name', name: 'team' },
    { label: 'Player Name', name: 'playerName' },
  ].map((field, index) => (
    <Grid item xs={field.name === 'name' ? 12 : 6} key={index}>
      <TextField
        label={field.label}
        name={field.name}
        type={field.type || 'text'}
        value={formData[field.name]}
        onChange={handleChange}
        fullWidth
        size="small"
        variant="outlined"
        InputLabelProps={field.inputProps}
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#888',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
            },
          },
          '& .MuiInputBase-input': {
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            fontSize: '0.95rem',
            color: '#222',
          },
          '& .MuiInputLabel-root': {
            color: '#555',
            fontWeight: 500,
          },
        }}
      />
    </Grid>
  ))}
</Grid>



                    <Button

                        onClick={handleUpdate}
                        variant="contained"
                        sx={{
                            width: '170px',
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #1976d2, #004ba0)',
                            color: 'white',
                            fontWeight: 600,
                            borderRadius: '8px',
                            px: 3,
                            mx: 1,
                            mt: 3,
                          
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #004ba0, #002b80)',
                            },
                        }}
                    >
                        Update Profile
                    </Button>

                    <Box mt={4}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Social Media</Typography>
                        <Box display="flex" gap={2}>
                            <IconButton href="https://youtube.com" target="_blank" color="error"><YouTubeIcon /></IconButton>
                            <IconButton href="https://facebook.com" target="_blank" color="primary"><FacebookIcon /></IconButton>
                            <IconButton href="https://instagram.com" target="_blank" sx={{ color: '#e1306c' }}><InstagramIcon /></IconButton>
                            <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#1DA1F2' }}><TwitterIcon /></IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)} message="Profile updated successfully!" />
            <Footer />
        </>
    );
};

export default ProfilePage;
