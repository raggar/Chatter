import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const data = await fetch(
        'https://server-chatter.herokuapp.com/video/token',
        {
          method: 'POST',
          body: JSON.stringify({
            identity: username,
            room: roomName,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err.message));
      setToken(data.token);
    },
    [roomName, username]
  );

  const handleLogout = useCallback((event) => {
    setToken(null);
  }, []);

  if (token) {
    return (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  }
  return (
    <Lobby
      username={username}
      roomName={roomName}
      handleUsernameChange={handleUsernameChange}
      handleRoomNameChange={handleRoomNameChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default VideoChat;
