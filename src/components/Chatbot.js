import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InfoIcon from '@mui/icons-material/Info';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import GroupIcon from '@mui/icons-material/Group';
import PlaceIcon from '@mui/icons-material/Place';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import StarsIcon from '@mui/icons-material/Stars';
import './Chatbot.css';

const infoData = {
  gameRules: `🏏 Game Rules:
- Short Match: 6 is OUT, only runs & 4s counted.
- Long Match: 6 is NOT out, all runs, 4s, 6s, wickets tracked.
- Bowlers can't bowl more than 1 over in a row (gap needed).`,

  cricketHistory: `📖 Cricket History:
Cricket began in England in the 16th century and spread globally.
It is now one of the most loved sports across the world, with formats like Test, ODI, and T20.`,

  playersList: `👥 Current Cricketers List:
- Kareem S (WK) – WK-Batter
- Hari A (C) – Batter
- Ummar S – Bowler
- Abbu S – Batter
- Ujair S – Bowler
- Amaanulla S (Sub) – Batter
- Arshad S (WK) – WK-Batter
- Niyaz S (C) – Batter
- Usman S – Bowler
- Muthaheer S – Batter
- Rizwan S – Bowler`,

  venue: `📍 Match Venue:
Ambedkar Colony, Pakala
(Beautiful local ground with community support!)`,

  appInfo: `📱 App Info:
Stric Buzz is a fun cricket scoreboard & commentary tool.
Currently in beta. More features coming soon!`,

  cricketFormats: `🏆 Cricket Formats:
- Test Match: 5-day long format, two innings each.
- T20: 7 overs per side, fast-paced and popular.`,

  famousRecords: `🏏 Stric Buzz Local Highlights:
- Most Scorers: Hari A (C), Arshad S (WK), Niyaz S (C), Abbu S
- Best Bowlers: Ujair S, Usman S
- Coolest Player: Arshad S (WK)
- Best Captaincy: Muthaheer S
- Iconic Player: Amanulla S, Rizwan`,

  splInfo: `🇮🇳 IPL Overview:
Street Premier League (SPL) is a professional S20 league in Pakala.
- Founded: 2025`,

  cricketTerms: `📚 Common Cricket Terms:
- LBW: Leg Before Wicket
- Yorker: A very full delivery
- Duck: Out without scoring
- Bouncer: A ball that bounces high toward the batter`,

  legendaryPlayers: `🌟 Legendary Players:
- Kareem S
- Hari A
- Muthaheer
- Niyaz S
- Abbu S
- Arshad`,
};

const iconMap = {
  gameRules: <SportsCricketIcon sx={{ fontSize: 16, mr: 1 }} />,
  cricketHistory: <InfoIcon sx={{ fontSize: 16, mr: 1 }} />,
  playersList: <GroupIcon sx={{ fontSize: 16, mr: 1 }} />,
  venue: <PlaceIcon sx={{ fontSize: 16, mr: 1 }} />,
  appInfo: <MobileFriendlyIcon sx={{ fontSize: 16, mr: 1 }} />,
  cricketFormats: <EmojiEventsIcon sx={{ fontSize: 16, mr: 1 }} />,
  famousRecords: <LeaderboardIcon sx={{ fontSize: 16, mr: 1 }} />,
  iplInfo: <SportsSoccerIcon sx={{ fontSize: 16, mr: 1 }} />,
  cricketTerms: <LocalLibraryIcon sx={{ fontSize: 16, mr: 1 }} />,
  legendaryPlayers: <StarsIcon sx={{ fontSize: 16, mr: 1 }} />,
};

const Chatbot = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('stricbuzz_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    localStorage.setItem('stricbuzz_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { text: message, sender: 'user' };
    const matchedKey = Object.keys(infoData).find((key) =>
      message.trim().toLowerCase() === key.replace(/([A-Z])/g, ' $1').toLowerCase()
    );

    let botMessage;
    if (matchedKey) {
      botMessage = {
        text: infoData[matchedKey],
        sender: 'bot',
        infoKey: matchedKey,
      };
    } else {
      botMessage = {
        text: "This message is Invalid. Please select one of the available options.",
        sender: 'bot',
      };
    }

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setMessage('');
  };

  const handleShowInfo = (key) => {
    const userMsg = {
      text: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      sender: 'user',
    };

    const botMsg = {
      text: infoData[key],
      sender: 'bot',
      infoKey: key,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setMessage('');
  };

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <Box
        className="chatbot-container"
        onClick={(e) => e.stopPropagation()}
        sx={{
          mt: 1.5,
          borderRadius: 4,
          boxShadow: 5,
          p: 2.5,
          backgroundColor: '#ffffff',
          maxWidth: 460,
          width: '90%',
          height: '87vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography sx={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiObjectsIcon sx={{ color: '#3f51b5' }} />
            Stric Bot
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Buttons */}
      <>
  <Grid container   spacing={1} // This sets both row and column gaps
  rowSpacing={2}  justifyContent="center" alignItems="center" sx={{ mb: 2, mt: 17 }}>
    {Object.keys(infoData).map((key) => (
      <Grid item key={key} xs="auto">
        <Button
          variant="outlined"
          onClick={() => handleShowInfo(key)}
          sx={{
            borderColor: '#000',
            color: '#000',
            fontSize: '13px',
            textTransform: 'none',
            padding: '5px 14px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: '#f9f9f9',
              borderColor: '#000',
            },
          }}
        >
          {iconMap[key]}
          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </Button>
      </Grid>
    ))}
  </Grid>

  <Typography variant="body2" color="text.secondary" align="center" mt={2}>
    Click any button above to view more information, and enjoy the StricBot experience 😉
  </Typography>
</>


        {/* Messages */}
        <Box
          ref={chatContainerRef}
          sx={{
            flex: 1,
            overflowY: 'auto',
            mb: 8,
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              className={`message-container ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {msg.sender === 'bot' && msg.infoKey ? (
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    backgroundColor: '#f8f9fa',
                    whiteSpace: 'pre-line',
                    fontSize: '14px',
                    maxWidth: '100%',
                    borderLeft: '4px solid #3f51b5',
                    borderRadius: '10px',
                    lineHeight: 1.6,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    {iconMap[msg.infoKey]} {msg.infoKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  {msg.text}
                </Paper>
              ) : (
                <Paper elevation={1} className="chat-message">
                  {msg.text}
                </Paper>
              )}
            </Box>
          ))}
        </Box>

        {/* Input */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 16,
            right: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: '#fff',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                backgroundColor: '#f1f1f1',
                fontSize: '0.95rem',
              },
            }}
          />
          <Button
            type="submit"
            variant="text"
            sx={{
              minWidth: 'auto',
              fontSize: '22px',
              padding: '6px',
              color: '#3f51b5',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#303f9f',
              },
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Chatbot;
