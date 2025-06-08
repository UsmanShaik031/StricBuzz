import React, { useRef, useState, useEffect } from 'react';
import { Typography, Box , Tooltip, Avatar, Dialog,  DialogContent} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import './App.css';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import MatchScore from './components/MatchScore';
import UpdateMatchScore from './components/UpdateMatchScore';
import Navbar from './components/Navbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { getAuth, signOut } from 'firebase/auth';
const Home = () => {
  

  const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(() => localStorage.getItem('showChatbot') === 'true');
// const [weather, setWeather] = useState(null);
  const [open, setOpen] = useState(false);
  const coinRef = useRef(null);
  const flipBtnRef = useRef(null);
  const flipSoundRef = useRef(null);
const [weather, setWeather] = useState(null);

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
const images = [
  '/assets/MATCH 1.png',
  '/assets/MATCH 2.jpg',
  '/assets/MATCH 3.jpg',
  '/assets/MATCH 4.jpeg',
  '/assets/MATCH 5.jpg',
  '/assets/MATCH 6.jpg',
  '/assets/MATCH 7.jpg',
  '/assets/MATCH 8.jpg',
];
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  const handleOpenChatbot = () => setShowChatbot(true);
  const handleCloseChatbot = () => setShowChatbot(false);

  useEffect(() => localStorage.setItem('heads', heads), [heads]);
  useEffect(() => localStorage.setItem('tails', tails), [tails]);
  useEffect(() => localStorage.setItem('showChatbot', showChatbot), [showChatbot]);



  const handleOpenDialog = () => {
    setOpen(true);
  };

  
useEffect(() => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=13.5839&lon=79.1169&appid=6c59c292a189e0542243914858dbcc18&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      setWeather({
        temp: Math.round(data.main.temp), // °C
        humidity: data.main.humidity, // %
        windSpeed: (data.wind.speed * 3.6).toFixed(1), // convert m/s → km/h
        prediction: data.weather[0].description, // next hour assumption
        icon: data.weather[0].icon, // optional
         clouds: data.clouds.all         
      });
    })
    .catch((err) => console.error("Weather fetch error:", err));
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
<Box
  sx={{
    overflow: 'hidden',
    width: '100%',
    marginTop:'20px',
    marginBottom:'-10px',
    height: 170,
    position: 'relative',
  }}
>
  <Box
    sx={{
      display: 'flex',
      width: 'fit-content',
      animation: 'scroll 40s linear infinite',
      '&::-webkit-scrollbar': { display: 'none' },
      '@keyframes scroll': {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
    }}
  >
    {[...images, ...images].map((img, index) => (
      <Box
        key={index}
        component="img"
        src={img}
        alt={`scroll-img-${index}`}
        sx={{
          height: 150,
          width: 250,
          objectFit: 'cover',
          borderRadius: 2,
          mx: 1,
          flexShrink: 0,
        }}
      />
    ))}
  </Box>
</Box>
      <div style={{marginLeft:'60px', marginTop:'10px', marginBottom:'28px', backgroundColor:''}}>
      <Typography
  sx={{
    textAlign: 'center',
    fontWeight: 700,
    fontSize:'28px',
    mt: 3,
    mb: 3,
    ml:-5.5,
    color: '#2c3e50',
    letterSpacing: 0.5,
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  }}
>
  🇲‌🇦‌🇹‌🇨‌🇭‌ 🇹‌🇴‌🇩‌🇦‌🇾‌
</Typography>

       <Tooltip >
         <box>   
       <Box
  sx={{
    border: '1px solid #e0e0e0',
    borderRadius: 3,
    p: 2,
    ml:-2,
    maxWidth: 280,
    height:160,
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#ffffff',
    position: 'relative',
    boxShadow: '0 4px 9px rgba(21, 19, 19, 0.05)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  }}
>
  {/* Team 1 */}
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Avatar
      src="/assets/fire.gif"
      alt="Fire"
      sx={{ width: 22, height: 16, mr: 1 }}
      variant="square"
    />
    <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#2c3e50' }}>
      Fire
    </Typography>
  </Box>

  {/* Team 2 */}
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Avatar
      src="/assets/storm.gif"
      alt="Storm"
      sx={{ width: 22, height: 16, mr: 1 }}
      variant="square"
    />
    <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#2c3e50' }}>
      Storm
    </Typography>
  </Box>

  {/* Match Status */}
  <Typography
    sx={{
      color: '#c0392b',
      fontSize: 13,
      mt: 2,
      fontWeight: 500,
    }}
  >
    Daily match starts at 5:20 PM if only if there is no Rain for more click Weather
  </Typography>

  {/* Schedule Label */}
<Typography
  onClick={handleOpenDialog}
  sx={{
    position: 'absolute',
    marginTop:12,
    bottom: 10,
    right: 14,
    fontSize: 12,
    fontWeight: 500,
    color: '#7f8c8d',
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline', color: '#2980b9' },
  }}
>
  WEATHER
</Typography>

</Box>

<Dialog
  open={open}
  onClose={() => {}}
  disableEscapeKeyDown
  maxWidth={false}
  fullWidth
  sx={{
    '& .MuiDialog-container': {
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .MuiPaper-root': {
      width: '1200px', // Choose a realistic wide value
      maxWidth: 'none',
    },
  }}
  PaperProps={{
    sx: {
      borderRadius: 7,
      overflow: 'visible',
    },
  }}
>
  <DialogContent
    sx={{
      width: '105%',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      borderRadius: 7,
      backgroundColor: "#f9fbfd",
      boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
      color: "#2c3e50",
      position: "relative",
      userSelect: "none",
      ml:-0.8
    }}
  >

  {/* Close Icon */}
 <IconButton
  onClick={() => setOpen(false)}
  aria-label="close"
  sx={{
    position: "absolute",
    top: 5,
    right: 7,
    width: 55,       // Increased button size
    height: 55,      // Increased button size
    color: "black",
    transition: "color 0.3s ease",
    "&:hover": { color: "#2980b9" },
  }}
>
  <CloseIcon sx={{ fontSize: 22 }} />  {/* Increased icon size */}
</IconButton>

  {/* Header */}
  <Typography
    variant="h6"
    fontWeight={700}
    sx={{
      textAlign: "center",
      color: "#2980b9",
      fontSize: "1.1rem",
      mb: 0.75,
      ml: -5,
      letterSpacing: 0.5,
      textTransform: "uppercase",
    }}
  >
    Weather Forecast
  </Typography>

  {/* Date */}
  <Typography
    variant="caption"
    sx={{
      textAlign: "center",
      display: "block",
      color: "#7f8c8d",
      fontSize: "0.7rem",
      mb: 1.5,
      fontWeight: 500,
      letterSpacing: 0.3,
    }}
  >
    {new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </Typography>

  {weather && (
    <>
      {/* Temperature and Icon */}
      <Box sx={{ textAlign: "center", mb: 1.5 }}>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{ lineHeight: 1.1, fontSize: "2.2rem", color: "#34495e" }}
        >
          {weather.temp}°C
        </Typography>
        <Box
          component="img"
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="Weather Icon"
          sx={{ width: 60, height: 60, mt: -1 }}
          loading="lazy"
        />
        <Typography
          variant="body2"
          sx={{
            color: "#34495e",
            mt: 0.5,
            fontSize: "0.9rem",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {weather.prediction}
        </Typography>
      </Box>

      {/* Location */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mb: 0.7,
          fontWeight: 600,
          fontSize: "0.9rem",
          color: "#2c3e50",
          letterSpacing: 0.3,
        }}
      >
        📍 Pakala, Andhra Pradesh
      </Typography>

      {/* Sunrise / Sunset */}
      <Typography
        variant="caption"
        sx={{
          textAlign: "center",
          display: "block",
          color: "#616161",
          mb: 1.5,
          fontSize: "0.75rem",
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        🌅 Sunrise 06:30 AM &nbsp;&nbsp;|&nbsp;&nbsp; 🌇 Sunset 06:15 PM
      </Typography>

      {/* Additional Info */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 1,
          px: 1,
          mb: 0,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "#2c3e50",
            minWidth: 100,
            textAlign: "center",
          }}
        >
          💨 Wind: {weather.windSpeed} km/h
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "#2c3e50",
            minWidth: 100,
            textAlign: "center",
          }}
        >
          ☁️ Clouds: {weather.clouds}%
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "#2c3e50",
            minWidth: 100,
            textAlign: "center",
          }}
        >
          💧 Humidity: {weather.humidity}%
        </Typography>
      </Box>
    </>
  )}
</DialogContent>


</Dialog>

</box>
    </Tooltip>
      </div>


      <div className="title-container" style={{marginLeft:'27px'}}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          Toss of Destiny
          <Box
            component="img"
            src="/assets/Double Ring@1x-1.0s-200px-200px.svg"
            alt="Live animation"
            sx={{ width: 50, height: 50, animation: 'pulse 1.8s infinite ease-in-out' }}
          />
        </Typography>
      </div>

      <div className="App">
        <div className="container" style={{marginTop:'20px'}}>
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

          <div className="coin-buttons">
            <button onClick={flipCoin} style={{ backgroundColor: '#d32f2f',
  color: 'white',
  marginRight: '8px'}} ref={flipBtnRef}>Flip Coin</button>
            <button style={{ backgroundColor: 'rgb(255, 255, 255)',
  border: '1px solid #1f8944',
  color: '#419c3e'}} onClick={resetGame}>Reset</button>
            <audio ref={flipSoundRef}>
              <source src="/assets/coin-flip-88793.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <MatchScore />
        <UpdateMatchScore onUpload={(scoreData) => console.log('Score data uploaded:', scoreData)} />
        <Footer />

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
