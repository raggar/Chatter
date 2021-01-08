import React from 'react';
import VideoChat from '../components/VideoChat';

import '../styles/Video.css';

const Video = () => {
  return (
    <div className="app">
      <header>
        <h1>Video Chat</h1>
      </header>
      <main>
        <VideoChat />
      </main>
    </div>
  );
};

export default Video;