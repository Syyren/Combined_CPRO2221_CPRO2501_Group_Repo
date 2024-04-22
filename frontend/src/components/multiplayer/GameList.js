import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function GameList({ onSelectGame }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleChange = (eventKey, event) => {
    setSelectedGame(event.target.innerText);
    onSelectGame(eventKey);
  };

  return (
    <div>
      <DropdownButton variant="outline-secondary" title={selectedGame ? selectedGame : "Select a game"} onSelect={handleChange}>
        <Dropdown.Item eventKey="hangman">Hangman</Dropdown.Item>
        {/*<Dropdown.Item eventKey="tic-tac-toe">Tic Tac Toe</Dropdown.Item>*/}
      </DropdownButton>
    </div>
  );
}

export default GameList;