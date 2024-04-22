import axios from 'axios';

const BASE_URL = `http://localhost:8090/api/hangman/`;

const fetchGameState = async (roomId) => {
    try {
        const response = await axios.get(BASE_URL + `${roomId}/gamestate`);
        console.log("Fetch Game State Response:", response);
        console.log("Response Data:", response.data);
        return response;
    } catch (error) {
        console.error("Error Fetching Game State:", error);
        throw error;
    }
};

const handleLetterSelect = async (letter, roomId, userId) => {
    try {
        const response = await axios.post(BASE_URL + `${roomId}/guess`, null, {
            params: { letterGuessed: letter, userId: userId }
        });
        console.log("Handle Letter Select Response:", response);
        return response;
    } catch (error) {
        console.error("Error Handling Letter Select:", error);
        throw error;
    }
};

const handleNewGame = async (roomId) => {
    try {
        await axios.get(BASE_URL + `${roomId}/new-game`);
        console.log("New Game Started");
        const response = await fetchGameState(roomId);
        return response;
    } catch (error) {
        console.error("Error Creating New Game:", error);
        throw error;
    }
};

const handleContinueGame = async (roomId) => {
    try {
        await axios.get(BASE_URL + `${roomId}/continue-game`);
        console.log("Game Continued");
        const response = await fetchGameState(roomId);
        return response;
    } catch (error) {
        console.error("Error Continuing Game:", error);
        throw error;
    }
};

const getUsersInRoom = async (roomId) => {
    try{
        const response = await axios.get(BASE_URL+`${roomId}/get-room`);
        console.log("Room obtained: ", response);
        const userArray = [response.data.user1, response.data.user2]; 
        return userArray;
    } catch (error){ 
        console.error("Error obtaining room: ", error);
        throw error;
    }
}
const addUserToRoom = async (roomId, userId) =>{
    try{
        await axios.post(BASE_URL+`${roomId}/add-user-to-room`, null, {
            params: { userId: userId }
        });
        console.log("Adding user "+userId+" to room ", roomId);
    } catch (error){
        console.error("Error adding user to room: ", error);
        throw error;
    }
}

export const HangmanMultiplayerAPI = {
    fetchGameState,
    handleLetterSelect,
    handleNewGame,
    handleContinueGame,
    getUsersInRoom,
    addUserToRoom
};
