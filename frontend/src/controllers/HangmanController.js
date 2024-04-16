import axios from 'axios';

const BASE_URL = `http://localhost:8090/api/hangman/`;

const fetchGameState = async () => {
    try {
        const response = await axios.get(BASE_URL + `gamestate`);
        console.log("Fetch Game State Response:", response);
        console.log("Response Data:", response.data); 
        return response;
    } catch (error) {
        console.error("Error Fetching Game State:", error);
        throw error;
    }
};


const handleLetterSelect = async (letter) => {
    try {
        const response = await axios.post(BASE_URL + `guess`, null, {
            params: { letterGuessed: letter }
        });
        console.log("Handle Letter Select Response:", response);
        return response;
    } catch (error) {
        console.error("Error Handling Letter Select:", error);
        throw error;
    }
};

const handleNewGame = async () => {
    try {
        await axios.get(BASE_URL + `new-game`);
        console.log("New Game Started");
        const response = await fetchGameState();
        return response;
    } catch (error) {
        console.error("Error Creating New Game:", error);
        throw error;
    }
};

const handleContinueGame = async () => {
    try {
        await axios.get(BASE_URL + `continue-game`);
        console.log("Game Continued");
        const response = await fetchGameState();
        return response;
    } catch (error) {
        console.error("Error Continuing Game:", error);
        throw error;
    }
};

export const HangmanAPI = {
    fetchGameState,
    handleLetterSelect,
    handleNewGame,
    handleContinueGame,
};
