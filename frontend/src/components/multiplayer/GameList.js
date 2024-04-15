import React from 'react';

function GameList({ onSelectGame }) {
  const handleChange = (e) => {
    onSelectGame(e.target.value);
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Select a game</option>
        <option value="hangman">Hangman</option>
        <option value="tic-tac-toe">Tic Tac Toe</option>
      </select>
    </div>
  );
}

export default GameList;