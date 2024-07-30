import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InputEmoji from 'react-input-emoji';
import { io } from 'socket.io-client';
import '../../styles/chat.css';
import sendIcon from '../../assets/images/paperPlane.svg';
import Avatar from '../../assets/images/avatar.svg';
import chatIcon from '../../assets/images/comment.svg';
import getUserInfo from '../../utils/getUserInfo';
import { toast } from 'react-toastify';

const { VITE_SOCKET_CHAT_URL } = process.env;

dayjs.extend(relativeTime);

const token = localStorage.getItem('token');

const socket = io.connect(VITE_SOCKET_CHAT_URL, {
  extraHeaders: {
    token,
  },
});

const Chat = () => {
  const [typingText, setTypingText] = useState('');
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [userName, setUserName] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const chatMessagesRef = useRef(null);
  const [showChats, setShowChats] = useState(false);
  const [showChatButton, setShowChatButton] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const inputRef = useRef(null);

  const room = 'chatbot';
  const user = getUserInfo();

  if (!user) return;

  socket.emit('join_room', room);

  const handleChatButtonClick = () => {
    setShowChats(false);
    setShowChatButton(true);
    setUnreadCount(0);
  };

  socket.on('username', ({ name, avatar }) => {
    setUserName(name);
    setUserAvatar(avatar);
  });

  const userId = user.payload?.id;

  const handleTypingStart = () => {
    socket.emit('typing', { user: userName, room, isTyping: true });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      toast.error('Oops! Your message is empty \u{1F614}');
      return;
    }
    socket.emit('send-chat-message', {
      message: newMessage,
      username: userName,
      avatar: userAvatar,
      date: new Date(),
    });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setNewMessage('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsSocketConnected(true);
      console.log('socket connected');
    });

    socket.on('disconnect', () => {
      setIsSocketConnected(false);
    });

    socket.on('istyping', (data) => {
      setTypingText(`@${data.user} is typing ...`);
      setTimeout(() => {
        setTypingText('');
      }, 3000);
    });

    socket.on('all-messages', (messages) => {
      setUserMessages(messages);
    });

    socket.on('chat-message', (message) => {
      setUserMessages((prevMessages) => [...prevMessages, message]);
      if (!showChats) {
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      socket.off('istyping');
      socket.off('chat-message');
    };
  }, [socket]);

  useEffect(() => {
    const chatMessagesContainer = chatMessagesRef.current;
    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  }, [userMessages]);

  return (
    <>
      <div className={`chat-container ${!showChats ? 'form-chat-hidden' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-title">Chat</div>
          <button onClick={handleChatButtonClick} className="close-button">
            X
          </button>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {userMessages.length === 0 ? (
            <p className="no-messages">No messages found.</p>
          ) : (
            userMessages.map((message) => {
              const isSender = message.senderId === userId;

              return (
                <div
                  key={message.id}
                  className={`chat-message ${isSender ? 'sent' : 'received'}`}
                >
                  {!isSender && (
                    <div className="profile-image-container">
                      <img
                        className="profile-image"
                        src={message.avatar || Avatar}
                        alt="Profile"
                      />
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-sender">
                      {isSender ? '@You' : `@${message.name}`}
                    </div>
                    <p className="message-text">{message.message}</p>
                    <div className="message-time">
                      <small>{dayjs(message.createdAt).fromNow()}</small>
                    </div>
                  </div>
                  {isSender && (
                    <div className="profile-image-container right">
                      <img
                        className="profile-image"
                        src={message.avatar || Avatar}
                        alt="Profile"
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <p className={`typing-text ${typingText ? 'typing-active' : ''}`}>
          <em>{typingText}</em>
        </p>
        <div className="chat-input">
          <div className="input-container">
            <InputEmoji
              type="text"
              placeholder="Type your message"
              defaultValue={newMessage}
              onChange={(value) => setNewMessage(value)}
              onEnter={handleSendMessage}
              onKeyDown={handleTypingStart}
              ref={inputRef}
            />
            <button className="send-button" onClick={handleSendMessage}>
              <img src={sendIcon} alt="Send" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setShowChats(true);
            setShowChatButton(false);
            setUnreadCount(0);
          }}
          type="submit"
          className={`chat-home-button ${
            showChatButton ? '' : 'btn-chat-hidden'
          }`}
        >
          <div className="chat-icon-container">
            <img src={chatIcon} alt="Send Icon" className="chat-img" />
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount}</span>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default Chat;
