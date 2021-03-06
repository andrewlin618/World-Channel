import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../../../utils/use-auth';
import { useHistory } from 'react-router-dom'

import Pool from './Pool';
import Messages from './Messages';
import Sender from './Sender';

// require('dotenv').config();
import './chat.css'

// const socketURL = 'http://localhost:3001/';
const socketURL = '/';
// const SOCKET_URI = process.env.REACT_APP_SERVER_URI;

const Chat = () => {
  const auth = useAuth();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    if (!auth.user.username) {
      return history.push('/')
    }
    socketRef.current = io(socketURL);
    socketRef.current.emit('join', auth.user);
    document.title = `Welcome, ${auth.user.username}`;

    return () => {
      console.log('Disconnecting socket...');
      if (io) io.disconnect()
    }
  }, [auth, history]);

  useEffect(() => {
    if (!auth.user.username) {
      return history.push('/')
    }
    let target = document.getElementsByClassName('messages')[0];
    target.scrollTop = target.scrollHeight;

    socketRef.current.on("join", res => {
      setMessages([...messages, { event: `You joined the room`, type: "notification" }])
      setUser(res);
    });

    socketRef.current.on("notification", res => {
      setMessages([...messages, { event: res, type: "notification" }])
    });


    socketRef.current.on("history", history => {
      setMessages(history);
    });

    socketRef.current.on("message", messages => {
      receiveMessage(messages);
    });

    socketRef.current.on("online users", onlineUsers => {
      console.log(onlineUsers);
      setOnlineUsers(onlineUsers);
    })
  })

  function receiveMessage(message) {
    setMessages([...messages, message])
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input !== '') {
      sendMessage();
    }
  }

  function sendMessage() {
    const messageObject = {
      body: input,
      id: user.id || '',
      name: user.name || '',
      avatar: user.avatar || 'me' 
    }
    socketRef.current.emit("send message", messageObject)
    setMessages([...messages, messageObject]);
    setInput('');
  }

  function handleChange(e) {
    if (e.target.value !== '\n') {
      setInput(e.target.value);
    }
  }

  function handleKeyPress(e) {
    if (input !== '' && e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
    return;
  }

  return (
    <>
      <Container>
        <Pool users={onlineUsers}/>
        <Messages user={user} messages={messages} />
        <Sender handleSubmit={handleSubmit} handleChange={handleChange} handleKeyPress={handleKeyPress} message={input} />
      </Container>
    </>
  );
}

const Container = (props) => {
  return (
    <div className='container'>
      {props.children}
    </div>
  );
}

export default Chat;