import React, { useRef, useState, useEffect } from 'react';
import {
  Drawer, IconButton, List, ListItem, ListItemText, Typography,
  Button as MUIButton, AppBar, Toolbar, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import UserLogin from './UserLogin';
import ProfileUpload from './ProfileUpload'; 
import Chatbot from './Chatbot';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const PASSWORD = '190';

const App = () => {
  const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('authenticated') === 'true');
  const [error, setError] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [showChatbot, setShowChatbot] = useState(() => localStorage.getItem('showChatbot') === 'true');

  const flipBtnRef = useRef(null);
  const coinRef = useRef(null);
  const flipSoundRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('heads', heads);
  }, [heads]);

  useEffect(() => {
    localStorage.setItem('tails', tails);
  }, [tails]);

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated);
  }, [authenticated]);

  useEffect(() => {
    localStorage.setItem('showChatbot', showChatbot);
  }, [showChatbot]);

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
      setError('Incorrect email or password, please try again.');
    }
  };

  if (!authenticated) {
    return (
      <UserLogin
        email={emailInput}
        password={passwordInput}
        setEmail={setEmailInput}
        setPassword={setPasswordInput}
        onSubmit={handlePasswordSubmit}
        error={error}
      />
    );
  }

  const handleOpenChatbot = () => setShowChatbot(true);
  const handleCloseChatbot = () => setShowChatbot(false);
return(
    <div>
      <AppBar position="static" style={{ background: 'white' }}>
        <Toolbar>
          <IconButton edge="start" sx={{ color: 'black' }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <div className="custom-navbar">
            {['8ball', 'number', 'coin', 'dice'].map((item, index) => (
              <div
                className={`nav-item${item === 'coin' ? ' active' : ''}`}
                key={index}
                style={item === 'coin' ? {
                  borderBottom: '2px solid #d32f2f',
                  paddingBottom: '4px',
                } : {}}
              >
                <div
                  className="icon"
                  style={item === 'coin' ? {
                    marginTop: '10px',
                    backgroundColor: '#fce4ec',
                    padding: '4px',
                    borderRadius: '8px',
                    boxShadow: '0 0 4px rgba(211, 47, 47, 0.3)',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  } : {}}
                >
                  <img
                    src={`/assets/${item}.png`}
                    alt={item}
                    className="icon-img"
                    style={item === 'coin' ? { width: '20px', height: '20px', objectFit: 'contain' } : {}}
                  />
                </div>
                <div className="label" style={item === 'coin' ? { marginTop: '4.5px', fontSize: '15px' } : {}}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </Toolbar>
      </AppBar>

<Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
  <Box width={300} padding={2}> {/* Added padding here too for overall spacing */}
    {/* Menu title with bottom shadow to separate from list */}
    <Box
    mt={-1}
  mb={1}
  pb={1}
  style={{
    borderBottom: '4px solid rgba(0, 0, 0, 0.1)', // thicker subtle border line
  }}
>
  <Box display="flex" alignItems="center" gap={1} pl={1}>
    <MenuIcon style={{ color: '#333' }} />
    <Typography
      variant="h6"
      gutterBottom
      style={{
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '4px 0',
        borderRadius: 4,
        display: 'inline-block',
        marginTop:'7px'
      }}
    >
      Menu
    </Typography>
  </Box>
</Box>

    <List>
      {/* Your list items here */}
      {[
        {
          title: "Score board",
          desc: "Showing scores and rankings."
        },
        {
          title: "Squads",
          desc: "Manage your teams and members."
        },
        {
          title: "Points table",
          desc: "Current points and statistics."
        },
        {
          title: "Teams",
          desc: "Overview of all teams."
        },
      ].map(({ title, desc }, index) => (
        <ListItem
          key={index}
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '9px 14px',  // added padding here
            marginBottom: 16,
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%' 
          }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              style={{
                fontWeight: 'bold',
                fontSize: '0.9rem',
                color: '#155724',            // dark green text
                backgroundColor: '#d4edda',  // light green bg
                border: '1px solid #c3e6cb', // green border
                borderRadius: 4,
                padding: '2px 8px',
                whiteSpace: 'nowrap',
              }}
            >
              Coming Soon
            </Typography>
          </div>
          <Typography
            variant="body2"
            style={{
              marginTop: 4,
              color: '#555',
              fontSize: '0.85rem',
              lineHeight: 1.3,
            }}
          >
            {desc}
          </Typography>
        </ListItem>
      ))}

      {/* Statistics below the menu items, aligned left and bold */}
      <ListItem style={{ padding: '12px 16px' }}>
        <ListItemText 
          primary={`Total Flips: ${heads + tails}`} 
          primaryTypographyProps={{ fontWeight: 'bold' }}
          style={{ textAlign: 'left' }}
        />
      </ListItem>
      <ListItem style={{ padding: '12px 16px' }}>
        <ListItemText 
          primary={`Heads: ${heads}`} 
          primaryTypographyProps={{ fontWeight: 'bold' }}
          style={{ textAlign: 'left' }}
        />
      </ListItem>
      <ListItem style={{ padding: '12px 16px' }}>
        <ListItemText 
          primary={`Tails: ${tails}`} 
          primaryTypographyProps={{ fontWeight: 'bold' }}
          style={{ textAlign: 'left' }}
        />
      </ListItem>

      {/* Attractive Clear Stats button */}
      <ListItem style={{ padding: '12px 16px', marginTop: 12 }}>
        <MUIButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={resetGame}
          style={{
            width:'45%',
            marginLeft:'60px',
            fontWeight: 'bold',
            padding: '10px 0',
            boxShadow: '0 4px 10px rgba(0, 123, 255, 0.4)',
            borderRadius: 6,
            textTransform: 'none',
          }}
        >
          Clear Stats
        </MUIButton>
        
      </ListItem>
      <ListItem style={{ padding: '12px 16px' }}>
  <MUIButton
  variant="contained"
  fullWidth
  onClick={() => {
    localStorage.removeItem('authenticated');
    setAuthenticated(false); // return to login page
  }}
  style={{
    width:'45%',
    backgroundColor: '#f44336',           // Material red
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 0',
    borderRadius: '8px',
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)', // soft red shadow
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginLeft:'60px'
  }}
>
  <CloseIcon fontSize="small" />
  Logout
</MUIButton>

</ListItem>

    </List>
  </Box>
</Drawer>





      <div className="logo-container">
        <img src="/assets/StreetBuzz.png" alt="Logo" className="logo" />
      </div>

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

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '9%',
          marginTop: '30px',
          alignItems: 'center',
          position: 'relative',
        }}
      >
       <ProfileUpload label="Captain" storageKey="user1Image" />
        <div style={{
          marginTop: '-10px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          color: '#7859a6',
        }}>
          VS
        </div>
     <ProfileUpload label="Captain" storageKey="user2Image" />
      </div>

      <div className="App">
        <div className="container">
          <div className="stats">
            <p>Heads: {heads}</p>
            <p>Tails: {tails}</p>
          </div>

          <div className="coin" ref={coinRef}>
            <div className="heads">
              <img
                src="https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/c82f3949ec4ba9503c875fc0fa7faa4a71053db7/Day%20%2307%20-%20Flip%20a%20Coin%20Game/heads.svg"
                alt="Heads"
              />
            </div>
            <div className="tails">
              <img
                src="https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/c82f3949ec4ba9503c875fc0fa7faa4a71053db7/Day%20%2307%20-%20Flip%20a%20Coin%20Game/tails.svg"
                alt="Tails"
              />
            </div>
          </div>

          <div id="buttons" style={{ display: 'inline-flex', gap: '20px', alignItems: 'center' }}>
            <button id="flip-button" onClick={flipCoin} ref={flipBtnRef}>Flip Coin</button>
            <button id="reset-button" onClick={resetGame}>Reset</button>
            <audio id="flip-sound" ref={flipSoundRef}>
              <source src="/assets/coin-flip-88793.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <div className="footer">
          <p>by Usman Shaik ヅ</p>
        </div>

     {showChatbot && (
  <>
    {/* Remove onClick here so clicking overlay does NOT close */}
    <div className="chatbot-overlay"></div>

    <div className="chatbot-container">
      <Chatbot onClose={handleCloseChatbot} />
    </div>
  </>
)}


{/* Floating Icon Button */}
<button className="chatbot-icon" onClick={handleOpenChatbot}>
  <ChatIcon />
</button>


      </div>
    </div>
  );
};

export default App;
