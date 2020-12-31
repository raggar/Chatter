import React from 'react';

import closeIcon from '../icons/closeIcon.png';
import onlineIcon from '../icons/onlineIcon.png';

import '../styles/infoBar.css';

const InfoBar = ({ room }) => (
  <div id="infobar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/join">
        <img src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;
