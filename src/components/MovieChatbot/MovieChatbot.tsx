import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { sendMessage } from '../../services/chatbotAPI';
import type { Message } from '../../types copy/chatbot';
import './Chatbot.css';

const MovieChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastMovie, setLastMovie] = useState<string | null>(null);
  const [lastQueryType, setLastQueryType] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputMessage, lastMovie, lastQueryType);
      const botMessage: Message = {
        text: response.message,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      if (response.lastMovie) {
        setLastMovie(response.lastMovie);
      }
      if (response.lastQueryType !== undefined) {
        setLastQueryType(response.lastQueryType);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        text: "I'm having trouble processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="floating-chatbot">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="chatbot-header">
              <h3>🎬 Movie Chat Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="close-button">
                <X size={20} />
              </button>
            </div>
            
            <div className="messages-container">
              {messages.length === 0 && (
                <div className="welcome-message bot-message">
                  <p>👋 Hi! I'm your movie assistant. Ask me about any movie and I'll tell you all about it!</p>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <p>{message.text}</p>
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="message bot-message loading">
                  <p>Searching for movie information...</p>
                </div>
              )}
              {lastMovie && !isLoading && (
                <div className="quick-replies">
                  <button onClick={() => setInputMessage("More details")}>More Details</button>
                  <button onClick={() => setInputMessage("Who is the director?")}>Director</button>
                  <button onClick={() => setInputMessage("Who are the main actors?")}>Cast</button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about a movie..."
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage} 
                className="send-button"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
};

export default MovieChatbot;