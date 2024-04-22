import React from 'react';

class RoomIdGenerator extends React.Component {
  generateRoomId = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let roomId = '';
    for (let i = 0; i < length; i++) {
      roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomId;
  };
}

export default RoomIdGenerator ;