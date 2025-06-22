import React, { useRef, useState, useEffect } from 'react';
import { Typography, Box, Tooltip, Avatar, Dialog, DialogContent } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';
import img7 from './images/7.jpg';
import img8 from './images/8.jpg';
import img9 from './images/9.jpg';
import img10 from './images/10.jpg';
import img11 from './images/11.jpg';
import './App.css';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import MatchScore from './components/MatchScore';
import UpdateMatchScore from './components/UpdateMatchScore';
import Navbar from './components/Navbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { getAuth, signOut } from 'firebase/auth';
import MatchHistory from './components/MatchHistory';
import CoinToss from './components/CoinToss';
const Home = () => {


  const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(() => localStorage.getItem('showChatbot') === 'true');
  // const [weather, setWeather] = useState(null);
  const [open, setOpen] = useState(false);
  const coinRef = useRef(null);
   const [isDarkMode, setIsDarkMode] = useState(false);
  const [weather, setWeather] = useState(null);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const profileImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
  }, 2000); // Change every 2 seconds

  return () => clearInterval(interval);
}, [profileImages.length]);


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
 const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };


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
          marginTop: '70px',
          marginBottom: '-10px',
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
      <div style={{ marginLeft: '60px', marginTop: '10px', marginBottom: '28px', backgroundColor: '' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '24px',
            mt: 5,
            mb: 3,
            ml: -5.5,
            color: '#2c3e50',
            letterSpacing: 0.5,
            fontFamily: "'Segoe UI', Roboto, sans-serif",
          }}
        >
          Match Today...
        </Typography>

        <Tooltip >
          <box>
 <Box
      sx={{ml:-2,mb:6,
        p: 2.5,
        borderRadius: 3,
        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        color: isDarkMode ? '#ecf0f1' : '#2c3e50',
        boxShadow: isDarkMode
          ? '8px 8px 16px rgba(0,0,0,0.3), -8px -8px 16px rgba(255,255,255,0.05)'
          : '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.6)',
        maxWidth: 340,
        height: 213,
        position: 'relative',
        border: '1px solid #000',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: isDarkMode
            ? '10px 10px 20px rgba(0,0,0,0.4), -10px -10px 20px rgba(255,255,255,0.05)'
            : '10px 10px 20px rgba(0,0,0,0.15), -10px -10px 20px rgba(255,255,255,0.6)',
        },
      }}
    >
      {/* Header: Match Title + Theme Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          Daily Match
        </Typography>
        <Box
          onClick={toggleTheme}
          sx={{
            width: 36,
            height: 20,
            backgroundColor: '#1d4d99',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              backgroundColor: isDarkMode ? '#fff' : '#fff',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: isDarkMode ? 4 : 'auto',
              right: isDarkMode ? 'auto' : 4,
              transform: 'translateY(-50%)',
              transition: 'all 0.3s ease',
            }}
          />
        </Box>
      </Box>

      {/* Team 1 */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Avatar
          src="/assets/fire.gif"
          alt="Fire"
          sx={{ width: 24, height: 18, mr: 1 }}
          variant="square"
        />
        <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#e74c3c' }}>
          Fire
        </Typography>
      </Box>

      {/* Team 2 */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Avatar
          src="/assets/storm.gif"
          alt="Storm"
          sx={{ width: 24, height: 18, mr: 1 }}
          variant="square"
        />
        <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#2980b9' }}>
          Storm
        </Typography>
      </Box>

      {/* Match Info */}
      <Typography
        sx={{
          fontSize: 13,
          mt: 2,
          fontWeight: 500,
          lineHeight: 1.5,
        }}
      >
        Daily match starts at <strong>5:20 PM</strong> — only if there's no rain.
        Click below to check weather updates.
      </Typography>

      {/* Weather clickable text */}
      <Typography
        onClick={handleOpenDialog}
        sx={{
          position: 'absolute',
          bottom: 12,
          right: 14,
          fontSize: 12,
          fontWeight: 600,
          color: '#7f8c8d',
          cursor: 'pointer',
          '&:hover': { color: '#2980b9', textDecoration: 'underline' },
        }}
      >
        WEATHER
      </Typography>
    </Box>

            <Dialog
              open={open}
              onClose={() => { }}
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
                  ml: -0.8
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


      <div className="title-container" style={{ marginLeft: '65px', marginTop: '60px' }}>
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
    <CoinToss/>
<Box sx={{mb:-8, mt:10}}>
<Typography fontFamily="'Pacifico', cursive" fontSize="1.6rem" color="#c74859" marginLeft={'125px'}>
  Explore Now
</Typography>
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
    ml="145px"
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

 


</Box>
        <MatchScore />
        <MatchHistory/>
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
