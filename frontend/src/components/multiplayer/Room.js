import React, { useState } from 'react';
import GameList from './GameList';
import RoomIdGenerator from './RoomIdGenerator';
import { useNavigate } from 'react-router-dom';

function Room() {
  const [selectedGame, setSelectedGame] = useState('');
  const [roomId, setRoomId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const MAX_ID_LENGTH = 10;
  const roomIdGenerator = new RoomIdGenerator();
  const navigate = useNavigate();

  const redirectToGame = () => {
    console.log('Redirecting to game:', selectedGame, roomId);
    if (selectedGame && roomId) {
      navigate(`/games/${selectedGame}/${roomId}`);
    }
  };

  const handleGenerateRoomId = () => {
    const generatedRoomId = roomIdGenerator.generateRoomId(MAX_ID_LENGTH);
    setRoomId(generatedRoomId);
    setErrorMessage('');
  };

  const handleJoinRoom = async () => {
    if (roomId.length > MAX_ID_LENGTH) {
      setErrorMessage(`Room ID cannot be greater than ${MAX_ID_LENGTH} characters`);
    } else {
      redirectToGame();
    }
  };

  return (
    <div>
      <h1>Rooms Page</h1>
      <GameList onSelectGame={setSelectedGame} />
      <input
        id="roomId"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID or Generate One"
      />
      <button onClick={handleGenerateRoomId}>Generate Room ID</button>
      <button onClick={handleJoinRoom}>Join Room</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Room;
