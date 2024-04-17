import axios from "axios";

// Base URL for the Arcade Shooter sessions API
const BASE_URL = "http://localhost:8090/api/arcadeshooter/sessions";

// Function to start a new session
const startSession = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/start`, null, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error starting session:", error);
    throw error;
  }
};

// Function to end an existing session
const endSession = async (id, finalScore, levelReached) => {
  try {
    const response = await axios.put(`${BASE_URL}/end/${id}`, {
      finalScore,
      levelReached,
    });
    return response.data;
  } catch (error) {
    console.error("Error ending session:", error);
    throw error;
  }
};

// Function to update an existing session
const updateSession = async (id, sessionData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};

// Function to retrieve a session by ID
const getSessionById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

// Function to retrieve sessions by user ID
const getSessionsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions for user:", error);
    throw error;
  }
};

// Function to delete a session by ID
const deleteSession = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
};

// Exported object containing Arcade Shooter API functions
export const ArcadeShooterApi = {
  startSession,
  endSession,
  updateSession,
  getSessionById,
  getSessionsByUserId,
  deleteSession,
};
