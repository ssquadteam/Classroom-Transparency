import React, { useState, useEffect, useRef } from 'react';
import './Chatroom.css';
import io from 'socket.io-client';

const socket = io('http://51.79.152.5:3001');

const Chatroom = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [newMessages, setNewMessages] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const dropdownRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetch('https://6711c250-f6ca-4f9f-a6e2-2b3df23ce26f-00-3paa249pb63vs.sisko.replit.dev:443/messages')
      .then((response) => response.json())
      .then((data) => setMessages(data.messages));

    setTimeout(() => {
      document.querySelector('.chatroom').classList.add('visible');
    }, 100);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkIfAtBottom = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const atBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
        setIsAtBottom(atBottom);
        return atBottom;
      }
      return false;
    };
  
    if (isAtBottom) {
      scrollToBottom();
    } else {
      setNewMessages(prev => prev + 1);
    }
  }, [messages]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some(msg => msg.id === message.id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    socket.on('deleteMessage', (messageId) => {
      setMessages((prevMessages) => 
        prevMessages.filter((message) => message.id !== messageId)
      );
    });

    socket.on('editMessage', (editedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === editedMessage.id ? { ...message, ...editedMessage } : message
        )
      );
    });

    return () => {
      socket.off('message');
      socket.off('deleteMessage');
      socket.off('editMessage');
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setNewMessages(0);
  }

  const handleNewMessagesClick = () => {
    scrollToBottom();
  }

  const handleSendMessage = () => {
    if (input.trim() !== '' || image) {
      const formData = new FormData();
      formData.append('text', input);
      formData.append('user', user.name);
      formData.append('userId', user.id);
      formData.append('timestamp', new Date().toISOString());
      if (image) {
        formData.append('image', image);
      }
  
      console.log('Sending message:', {
        text: input,
        user: user.name,
        userId: user.id,
        timestamp: new Date().toISOString(),
        image,
      });
  
      fetch('https://6711c250-f6ca-4f9f-a6e2-2b3df23ce26f-00-3paa249pb63vs.sisko.replit.dev:443/messages', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Message sent successfully:', data);
          setInput('');
          setImage(null);
          setPreviewImage(null);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleDeleteMessage = (messageId) => {
    if (user.admin || messages.find((msg) => msg.id === messageId).userId === user.id) {
      fetch(`https://6711c250-f6ca-4f9f-a6e2-2b3df23ce26f-00-3paa249pb63vs.sisko.replit.dev:443/messages/${messageId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.deleted) {
            setMessages(messages.filter((message) => message.id !== messageId));
            socket.emit('deleteMessage', messageId);
          } else {
            alert('Failed to delete the message.');
          }
        });
    } else {
      alert('You do not have permission to delete this message.');
    }
  };

  const handleEditMessage = (messageId, newText) => {
    const now = new Date();
    const message = messages.find((msg) => msg.id === messageId);
    const messageTime = new Date(message.timestamp);
    const timeDiff = (now - messageTime) / (1000 * 60);

    if (timeDiff <= 5) {
      const editedMessage = { ...message, text: newText };
      setMessages(
        messages.map((msg) =>
          msg.id === messageId ? editedMessage : msg
        )
      );
      socket.emit('editMessage', editedMessage);
      setEditingMessageId(null);
    } else {
      alert('You can only edit messages up to 5 minutes old.');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const startEditing = (messageId, text) => {
    setEditingMessageId(messageId);
    setEditInput(text);
  };

  const toggleDropdown = (messageId, event) => {
    event.stopPropagation();
    setActiveDropdown(prevActiveDropdown => 
      prevActiveDropdown === messageId ? null : messageId
    );
  };

  return (
    <div className="chatroom">
      <h2>Grade-IX Chat Room</h2>
      <div className="chatroom-messages" ref={chatContainerRef}>
        <div className={`chatroom-new-messages ${newMessages > 0 && !isAtBottom ? 'visible' : ''}`} onClick={handleNewMessagesClick}>
          {newMessages} New Messages Below
        </div>
        {messages.length === 0 ? (
          <div className="chatroom-welcome">Send a message to get started</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="chatroom-message">
              {editingMessageId === message.id ? (
                <div className="chatroom-edit-container">
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="chatroom-edit-input"
                  />
                  <button onClick={() => handleEditMessage(message.id, editInput)}>Save</button>
                  <button onClick={() => setEditingMessageId(null)}>Cancel</button>
                </div>
              ) : (
                <div className="chatroom-message-content">
                  <div className="chatroom-message-text">
                    <span className="chatroom-username">{message.user}</span> {message.text}
                    {message.imagePath && (
                      <img 
                        src={`https://6711c250-f6ca-4f9f-a6e2-2b3df23ce26f-00-3paa249pb63vs.sisko.replit.dev:443/${message.imagePath}`} 
                        alt="Uploaded" 
                        className="chatroom-image" 
                      />
                    )}
                  </div>
                  {(user.admin || message.userId === user.id) && (
                    <div className="chatroom-message-actions" ref={activeDropdown === message.id ? dropdownRef : null}>
                      <button 
                        className="chatroom-message-actions-button"
                        onClick={(e) => toggleDropdown(message.id, e)}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                      {activeDropdown === message.id && (
                        <div className="chatroom-message-actions-dropdown">
                          <button onClick={() => startEditing(message.id, message.text)}>Edit</button>
                          <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      {previewImage && (
        <div className="chatroom-preview-image">
          <img src={previewImage} alt="Preview" />
          <button onClick={() => {setImage(null); setPreviewImage(null);}}>❌</button>
        </div>
      )}
      <div className="chatroom-input-container">
        <input
          type="file"
          onChange={handleImageUpload}
          id="imageUpload"
          style={{ display: 'none' }}
        />
        <label htmlFor="imageUpload" className="chatroom-button">📎</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chatroom-input"
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className="chatroom-send-button">Send</button>
      </div>
    </div>
  );
};

export default Chatroom;