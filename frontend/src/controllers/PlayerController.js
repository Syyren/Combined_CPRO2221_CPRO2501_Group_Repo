import axios from "axios";

const API_URL = "http://localhost:8090/api/players";

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
    const { data } = await axios.get(`${API_URL}/all`);
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
  register,
  getAllPlayers,
  getPlayerByUsername,
  updatePlayer,
  deletePlayer,
  getPlayerById,
  getUserIdByUsername,
};
