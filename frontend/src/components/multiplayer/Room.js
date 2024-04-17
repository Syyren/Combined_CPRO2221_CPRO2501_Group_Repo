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
    <div className="homePageContainer">
      <div className="mt-5 mb-2">
        <h1 className="display-4 mb-2">Player vs Player Rooms</h1>
        <div className="d-flex flex-column align-items-end">
          <GameList onSelectGame={setSelectedGame} />
        </div>
      </div>
      <div className="input-group d-flex align-items-center justify-content-center">
        <input
          className="form-control"
          id="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID or Generate One"
        />
        <button 
          className="btn btn-outline-secondary"
          id=""
          onClick={handleGenerateRoomId}>
          Generate Room ID
        </button>
        <button
          className="btn btn-outline-secondary"
          id=""
          onClick={handleJoinRoom}>
          Join Room
        </button>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Room;
