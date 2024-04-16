import axios from "axios";

const BASE_URL = "http://localhost:8090/api/arcadeshooter/sessions";

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

const updateSession = async (id, sessionData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};

const getSessionById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

const getSessionsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions for user:", error);
    throw error;
  }
};

const deleteSession = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
};

export const ArcadeShooterApi = {
  startSession,
  endSession,
  updateSession,
  getSessionById,
  getSessionsByUserId,
  deleteSession,
};
