import React, { useState, useEffect } from 'react';
import './AchievementNotification.css';
import frog from './images/frog-spin-frog.gif';
//audio is a free to use sound effect called 'Game Start' by Pixabay
import beep from './audio/ping.mp3'

//this component takes in the achievementName in order to render the notification
const AchievementNotification = ({ achievementTitle }) => 
{
  //setting the show useState to false so it stays hidden until called
  const [showNotification, setShowNotification] = useState(false);
  const audio = new Audio(beep);

  useEffect(() => 
  {
    audio.play();
    setShowNotification(true);
    const timeout = setTimeout(() => 
    {
      setShowNotification(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [achievementTitle]);

  return (
    <div className={`text-center notification ${showNotification ? 'show' : ''}`}>
      <div className='d-flex'>
        <div 
        className='justify-content-center me-2 iconBox'
        >
          <img 
          src={frog} 
          alt='frog spinning gif'
          ></img>
        </div>
        <div>
          Achievement Unlocked! <br /> {achievementTitle}
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;
