import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:8090";

// Function to retrieve all scores from the backend
export const getAllScores = async () => {
  const { currentUser } = useAuth();
  try {
    const res = await axios.get(`${API_URL}/scores/allscores`, {
      headers: { Authorization: `Bearer ${currentUser.jwt}` },
    });
    const scores = res.data;
    console.log("Scores from API:", scores);
    return scores;
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};

// Function to retrieve scores by game name
export const getScoresByGame = async (gameName) => {
  const { currentUser } = useAuth();
  try {
    const res = await axios.get(`${API_URL}/scores/game/${gameName}`, {
      headers: { Authorization: `Bearer ${currentUser.jwt}` },
    });
    const scores = res.data;
    console.log(`Scores for game ${gameName} from API:`, scores);
    return scores;
  } catch (error) {
    console.error(`Error fetching scores for game ${gameName}:`, error);
    return [];
  }
};

// Function to retrieve scores by user ID
export const getScoresByUser = async (userId) => {
  const { currentUser } = useAuth();
  try {
    const res = await axios.get(`${API_URL}/scores/user/${userId}`, {
      headers: { Authorization: `Bearer ${currentUser.jwt}` },
    });
    const scores = res.data;
    console.log(`Scores for user ${userId} from API:`, scores);
    return scores;
  } catch (error) {
    console.error(`Error fetching scores for user ${userId}:`, error);
    return [];
  }
};

// Function to retrieve scores by user ID and game name
export const getScoresByUserAndGame = async (userId, gameName) => {
  const { currentUser } = useAuth();
  try {
    const res = await axios.get(
      `${API_URL}/scores/user/${userId}/game/${gameName}`,
      {
        headers: { Authorization: `Bearer ${currentUser.jwt}` },
      }
    );
    const scores = res.data;
    console.log(
      `Scores for user ${userId} and game ${gameName} from API:`,
      scores
    );
    return scores;
  } catch (error) {
    console.error(
      `Error fetching scores for user ${userId} and game ${gameName}:`,
      error
    );
    return [];
  }
};

// Function to submit a new score
export const submitScore = async (scoreEntry) => {
  const { currentUser } = useAuth();
  try {
    const res = await axios.post(`${API_URL}/scores/save`, scoreEntry, {
      headers: { Authorization: `Bearer ${currentUser.jwt}` },
    });
    const savedScore = res.data;
    console.log("Saved score:", savedScore);
    return savedScore;
  } catch (error) {
    console.error("Error submitting score:", error);
    throw new Error("Failed to submit score");
  }
};
