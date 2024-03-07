import React, { useState, useEffect } from 'react';
import './AchievementNotification.css';

//this component takes in the achievementName in order to render the notification
const AchievementNotification = ({ achievementName }) => 
{
  //setting the show useState to false so it stays hidden until called
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => 
  {
    setShowNotification(true);
    const timeout = setTimeout(() => 
    {
      setShowNotification(false);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [achievementName]);

  return (
    <div className={`notification ${showNotification ? 'show' : ''}`}>
      {achievementName} unlocked!
    </div>
  );
};

export default AchievementNotification;
