import axios from "axios";

// Base URL for the players API
const API_URL = "http://localhost:8090/api/players";

// Function to check if email exit
const handleForgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/get-user-by-email`, { email });
    return response.data;
  } catch (error) {
    console.error("Error checking account:", error);
    throw error;
  }
};

// Function to check QnA exit
const handleSecurityQnA = async (email, securityQuestion, answer) => {
  try {
    const response = await axios.post(`${API_URL}/check-QnA`, { email, securityQuestion, answer });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {

      console.error("Unauthorized: Incorrect security question or answer.");
      throw new Error("Unauthorized: Incorrect security question or answer.");
    } else {
      console.error("Error verifying QnA", error);
      throw error;
    }
  }
};


//Function to change password
const handleSetNewPassword = async (email, newPassword, setError) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, { email, newPassword });
    return response.data; 
  } catch (error) {
    console.error("Failed to reset password", error);
    if (setError) {
      setError("Failed to reset password. Please try again."); 
    }
    throw error; 
  }
};









// Function to register a player
const register = async (player) => {
  try {
    const response = await axios.post(`${API_URL}/register`, player);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

// Function to fetch all players
const getAllPlayers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/get/all`);
    return data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

// Function to get a player by username
const getPlayerByUsername = async (username) => {
  try {
    const { data } = await axios.get(`${API_URL}/username/${username}`);
    return data;
  } catch (error) {
    console.error("Error fetching player by username:", error);
    throw error;
  }
};

// Function to update a player
const updatePlayer = async (playerId, updatedPlayer) => {
  try {
    const response = await axios.put(
      `${API_URL}/update/${playerId}`,
      updatedPlayer
    );
    return response.data;
  } catch (error) {
    console.error("Error updating player:", error);
    throw error;
  }
};

// Function to delete a player
const deletePlayer = async (playerId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${playerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting player:", error);
    throw error;
  }
};

// Function to get a player by ID
const getPlayerById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/get/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching player by ID:", error);
    throw error;
  }
};

// Function to get a user ID by username
const getUserIdByUsername = async (username) => {
  try {
    const { data } = await axios.get(`${API_URL}/id-by-username/${username}`);
    return data;
  } catch (error) {
    console.error("Error fetching user ID by username:", error);
    throw error;
  }
};

export {
  handleForgotPassword,
  handleSecurityQnA,
  handleSetNewPassword,
  register,
  getAllPlayers,
  getPlayerByUsername,
  updatePlayer,
  deletePlayer,
  getPlayerById,
  getUserIdByUsername,
};
