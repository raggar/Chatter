import React from 'react';
import ScollToBottom from 'react-scroll-to-bottom';

import Message from './Message';
import '../styles/Messages.css';

const Messages = ({ messages, name }) => (
  <ScollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScollToBottom>
);

export default Messages;
