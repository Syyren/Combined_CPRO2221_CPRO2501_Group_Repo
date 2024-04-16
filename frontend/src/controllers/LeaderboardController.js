import axios from "axios";

const API_URL = "http://localhost:8090";

// Function to retrieve all scores from the backend
export const getAllScores = async () => {
  try {
    const res = await axios.get(`${API_URL}/scores/allscores`);
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
  try {
    const res = await axios.get(`${API_URL}/scores/game/${gameName}`);
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
  try {
    const res = await axios.get(`${API_URL}/scores/user/${userId}`);
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
  try {
    const res = await axios.get(
      `${API_URL}/scores/user/${userId}/game/${gameName}`);
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
  try {
    const res = await axios.post(`${API_URL}/scores/save`, scoreEntry);
    const savedScore = res.data;
    console.log("Saved score:", savedScore);
    return savedScore;
  } catch (error) {
    console.error("Error submitting score:", error);
    throw new Error("Failed to submit score");
  }
};
