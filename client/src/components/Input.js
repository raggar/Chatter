import React from 'react';

import '../styles/Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form id="input">
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === 'Enter' ? sendMessage(event) : null
      }
    />
    <button type="button" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
