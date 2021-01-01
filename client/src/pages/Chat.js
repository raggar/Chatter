import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // retrive data from url
import io from 'socket.io-client';

import '../styles/Chat.css';

import InfoBar from '../components/InfoBar';
import Input from '../components/Input';
import Messages from '../components/Messages';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    // get room and name from params
    const { room, name } = queryString.parse(location.search);

    socket = io(ENDPOINT, {
      reconnectionAttempts: 'Infinity',
    });

    setName(name);
    setRoom(room);

    // send name and room as payload when someone joins
    socket.emit('join', { name, room }, (error) => {
      // callback returns any errors
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    // recieve message from backend
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    // receive users from backend
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit('close');
      socket.off();
    };
  }, [messages, users]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div id="chat">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {/* <TextContainer users={users} /> */}
      </div>
    </div>
  );
};

export default Chat;
