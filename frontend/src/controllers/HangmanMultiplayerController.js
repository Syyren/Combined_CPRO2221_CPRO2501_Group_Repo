import axios from 'axios';

const API_URL = "http://localhost:8090/api/games/hangman/${roomId}";

export const fetchGameState = async (roomId) => {
  try {
      const response = await axios.get(`${API_URL}/gamestate`);
      console.log("Fetched game state:", response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching game state:', error);
      throw error;
  }
};

export const handleLetterSelect = async (letter) => {
    try {
        const response = await axios.post(`${API_URL}/guess`, null, {
            params: { letterGuessed: letter }
        });
        return response.data; // Return the updated game state
    } catch (error) {
        console.error('Error selecting letter:', error);
        throw error; // Throw the error so that callers can handle it
    }
};

export const handleNewGame = async () => {
    try {
        await axios.get(`${API_URL}/new-game`);
    } catch (error) {
        console.error('Error starting new game:', error);
        throw error; // Throw the error so that callers can handle it
    }
};

export const handleContinueGame = async () => {
    try {
        await axios.get(`${API_URL}/continue-game`);
    } catch (error) {
        console.error('Error continuing game:', error);
        throw error; // Throw the error so that callers can handle it
    }
};

export const checkGameResult = (gameState) => {
    if (gameState.gameStatus === 'won') {
        console.log("Game won!");
        // Perform actions for winning
    } else if (gameState.gameStatus === 'lost') {
        console.log("Game lost!");
        // Perform actions for losing
    }
};
