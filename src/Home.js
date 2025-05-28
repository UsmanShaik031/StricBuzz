import React, { useRef, useState, useEffect } from 'react';
import {
  Typography, Box
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import './App.css';
import Footer from './components/Footer';
import UserLogin from './components/UserLogin';
import Chatbot from './components/Chatbot';
import MatchScore from './components/MatchScore';
import UpdateMatchScore from './components/UpdateMatchScore';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';


const PASSWORD = '807400@';

const Home = () => {
  const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('authenticated') === 'true');
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [showChatbot, setShowChatbot] = useState(() => localStorage.getItem('showChatbot') === 'true');

  const coinRef = useRef(null);
  const flipBtnRef = useRef(null);
  const flipSoundRef = useRef(null);
  const flipCoin = () => {
    const isHeads = Math.random() < 0.5;

    if (!coinRef.current || !flipBtnRef.current || !flipSoundRef.current) return;

    coinRef.current.style.animation = 'none';
    flipSoundRef.current.currentTime = 0;
    flipSoundRef.current.play();

    setTimeout(() => {
      coinRef.current.style.animation = isHeads ? 'spin-heads 3s forwards' : 'spin-tails 3s forwards';

      setTimeout(() => {
        isHeads ? setHeads(h => h + 1) : setTails(t => t + 1);
        flipBtnRef.current.disabled = false;
      }, 3000);
    }, 100);

    flipBtnRef.current.disabled = true;
  };

  // Reset game
  const resetGame = () => {
    if (coinRef.current) coinRef.current.style.animation = 'none';
    setHeads(0);
    setTails(0);
  };

  const handlePasswordSubmit = () => {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (email === 'spl@gmail.com' && password === PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect email or password Entered, please try again.');
    }
  };

  // Chatbot toggle
  const handleOpenChatbot = () => setShowChatbot(true);
  const handleCloseChatbot = () => setShowChatbot(false);

  // Logout
const handleLogout = () => {
  localStorage.removeItem('authenticated'); // remove persisted auth
  setAuthenticated(false);  // this triggers re-render to login screen
};

  // Persist state
  useEffect(() => localStorage.setItem('heads', heads), [heads]);
  useEffect(() => localStorage.setItem('tails', tails), [tails]);
  useEffect(() => localStorage.setItem('authenticated', authenticated), [authenticated]);
  useEffect(() => localStorage.setItem('showChatbot', showChatbot), [showChatbot]);
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1100); // 1 second
  return () => clearTimeout(timer);
}, []);

  if (loading) {
    return <LoadingScreen />; // 👈 splash screen comes first
  }
  // Render login if not authenticated
  if (!authenticated) {
    return (
     <UserLogin
  email={emailInput}
  password={passwordInput}
  setEmail={setEmailInput}
  setPassword={setPasswordInput}
  onSubmit={handlePasswordSubmit}
  error={error}
  clearError={() => setError('')}  // <-- add this to clear error on focus
/>

    );
  }


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

      {/* Logo */}
      <div className="logo-container" >
        <img src="/assets/StreetBuzz.png" alt="Logo" className="logo" />
      </div>

      {/* Title */}
 
 <div style={{ textAlign: 'center', marginTop: '-60px', marginBottom: '4%' }}>


        <style>
          {`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
          `}
        </style>
      </div>
    
 {/* Captains Upload */}
<Box>
 
  {/* Divider with less vertical spacing */}
  {/* <Divider
    sx={{
      my: 2, // less vertical margin
      mx: 'auto',
      width: '60%',
      borderColor: 'black',
      borderBottomWidth: 2,
      marginBottom:'15%'
    }}
  /> */}
</Box>


{/* Toss Title */}
<div style={{ textAlign: 'center', marginBottom: '13%', marginTop: '-3%' }}>
  <Typography
    variant="h5"
    sx={{
      fontWeight: 'bold',
      color: 'text.primary',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      display: 'inline-flex',         // make Typography inline-flex to align text & SVG horizontally
      alignItems: 'center',           // vertical center alignment
      justifyContent: 'center',       // center horizontally inside div
      gap: 1,                         // space between text and svg (theme spacing 1 = 8px)
    }}
  >
    Toss of Destiny
    <Box
      component="img"
      src="/assets/Double Ring@1x-1.0s-200px-200px.svg"
      alt="Live animation"
      sx={{
        width: 50,
        height: 50,
        animation: 'pulse 1.8s infinite ease-in-out',
      }}
    />
  </Typography>
</div>



      {/* Coin Game */}
      <div className="App">
        <div className="container">
          <div className="stats">
            <p>Heads: {heads}</p>
            <p>Tails: {tails}</p>
          </div>

          <div className="coin" ref={coinRef}>
            <div className="heads">
              <img src="https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/c82f3949ec4ba9503c875fc0fa7faa4a71053db7/Day%20%2307%20-%20Flip%20a%20Coin%20Game/heads.svg" alt="Heads" />
            </div>
            <div className="tails">
              <img src="https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/c82f3949ec4ba9503c875fc0fa7faa4a71053db7/Day%20%2307%20-%20Flip%20a%20Coin%20Game/tails.svg" alt="Tails" />
            </div>
          </div>

          <div id="buttons" className="coin-buttons">
            <button id="flip-button" onClick={flipCoin} ref={flipBtnRef}>Flip Coin</button>
            <button id="reset-button" onClick={resetGame}>Reset</button>
            <audio id="flip-sound" ref={flipSoundRef}>
              <source src="/assets/coin-flip-88793.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <MatchScore />
        <UpdateMatchScore onUpload={(scoreData) => console.log('Score data uploaded:', scoreData)} />
        

        {/* Footer */}
     
<Footer/>

        {/* Chatbot Section */}
        {showChatbot ? (
          <>
            <div className="chatbot-overlay" />
            <div className="chatbot-container">
              <Chatbot onClose={handleCloseChatbot} />
            </div>
          </>
        ) : (
          <button className="chatbot-icon" onClick={handleOpenChatbot}>
            <ChatIcon />
          </button>
        )}
      </div>
      
    </div>
  );
};

export default Home;
