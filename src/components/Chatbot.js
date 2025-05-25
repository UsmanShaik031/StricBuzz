import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Chatbot.css'; // Your custom CSS

const Chatbot = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

useEffect(() => {
  const container = chatContainerRef.current;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}, [messages]);


  useEffect(() => {
    const defaultBotMessage = {
      text: 'This feature will be available in V4.0.1.0 Release',
      sender: 'bot',
    };
    setMessages([defaultBotMessage]);
  }, []);

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
    <div className="chatbot-overlay" onClick={() => {}}>
      <div className="chatbot-container" onClick={handleContainerClick}>
        <div className="chatbot-header">
          <h2>𝐒𝐭𝐫𝐢𝐜𝐁𝐨𝐭</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        <Container className="chat-messages" ref={chatContainerRef}>
          <ListGroup>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-container ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <ListGroup.Item className="chat-message">{msg.text}</ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Container>

        <Form onSubmit={handleSubmit} className="chat-input-container">
          <Form.Group controlId="message" className="message-input-container">
            <Form.Control
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn send-btn">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Chatbot;
