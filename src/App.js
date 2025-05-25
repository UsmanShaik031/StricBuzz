import React, { useRef, useState, useEffect } from 'react';
import {
  Typography,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import './App.css';

import UserLogin from './components/UserLogin';
import ProfileUpload from './components/ProfileUpload';
import Chatbot from './components/Chatbot';
import MatchScore from './components/MatchScore';
import UpdateMatchScore from './components/UpdateMatchScore';
import Navbar from './components/Navbar';

// Constant password
const PASSWORD = '807400@';

const App = () => {
  // Coin state
  const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);

  // UI & Auth state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('authenticated') === 'true');
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [showChatbot, setShowChatbot] = useState(() => localStorage.getItem('showChatbot') === 'true');

  

  // Refs for coin animation
  const coinRef = useRef(null);
  const flipBtnRef = useRef(null);
  const flipSoundRef = useRef(null);

  // Flip coin logic
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
      <div className="logo-container">
        <img src="/assets/StreetBuzz.png" alt="Logo" className="logo" />
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', marginTop: '-50px', marginBottom: '13%' }}>
        <Typography
          variant="h5"
          style={{
            fontWeight: 600,
            color: 'black',
            animation: 'bounce 2s infinite',
            marginTop: '5%',
            marginLeft: '8px',
          }}
        >
          LUCK IN THE AIR
        </Typography>
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
      <div className="profile-upload-section">
        <ProfileUpload  storageKey="user1Image" />
        <div className="vs-circle">VS</div>
        <ProfileUpload  storageKey="user2Image" />
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

        {/* Match Score */}
        <MatchScore />
        <UpdateMatchScore onUpload={(scoreData) => console.log('Score data uploaded:', scoreData)} />
        

        {/* Footer */}
        <div className="footer">
          <p>by Usman Shaik ヅ</p>
        </div>

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

export default App;
