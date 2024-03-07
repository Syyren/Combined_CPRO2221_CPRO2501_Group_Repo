import React, { useState, useEffect } from 'react';
import './AchievementNotification.css';

const AchievementNotification = ({ achievementName }) => 
{
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(true);
    const timeout = setTimeout(() => {
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
