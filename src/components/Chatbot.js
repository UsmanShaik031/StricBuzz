import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import './Chatbot.css';

const STORAGE_KEY = 'chatbot_messages';

const Chatbot = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedMessages = saved ? JSON.parse(saved) : null;

      if (Array.isArray(savedMessages) && savedMessages.length > 0) {
        return savedMessages;
      } else {
        const defaultMsg = [{
          text: 'Hi! This feature will be available in further releases. Stay Tuned!',
          sender: 'bot',
        }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMsg));
        return defaultMsg;
      }
    } catch (err) {
      console.error('Error loading messages from storage:', err);
      return [{
        text: 'Hi! This feature will be available in further releases. Stay Tuned!',
        sender: 'bot',
      }];
    }
  });

  const chatContainerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { text: message, sender: 'user' };
    const botMessage = { text: 'Currently this feature is on hold', sender: 'bot' };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setMessage('');
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="chatbot-overlay" onClick={onClose}>
      <Box className="chatbot-container" onClick={handleContainerClick}>
        <Box className="chatbot-header" display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <SmartToyIcon fontSize="large" />
            <Typography variant="h5" fontWeight={600}>
              StricBot
            </Typography>
          </Box>
          <IconButton onClick={onClose} className="close-button" sx={{ marginLeft: 'auto', paddingRight: 0 }}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box className="chat-messages" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              className={`message-container ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <Paper elevation={2} className="chat-message">
                {msg.text}
              </Paper>
            </Box>
          ))}
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="chat-input-container"
          mb={0.3}
          mt={2}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: 65,
              height: 55,
              minWidth: 0,
              borderRadius: '50%',
              backgroundColor: '#45b7d1',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#2ca3be',
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
