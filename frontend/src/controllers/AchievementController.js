import axios from "axios";

const API_URL = "http://localhost:8090/api/achievement";

//function that pulls all categories from the database through the axios
export const getAchievements = async () => {
  try {
    const res = await axios.get(`${API_URL}/get/all`, {
      headers: { Authorization: authToken },
    });
    const achievements = res.data;
    console.log("Achievements from API:", achievements);
    return achievements;
  } catch (err) {
    console.error("Error fetching achievements:", err); //outputs in the event of an error fetching the categories
    return [];
  }
};

// Temporary Function to satisfy httpbasic auth Spring Security
const username = "john_doe";
const password = "password123";
const authToken = generateAuthToken(username, password);

function generateAuthToken(username, password) {
  // Encode the username and password with Base64
  const authToken = btoa(`${username}:${password}`);

  // Return the complete Authorization header value
  return `Basic ${authToken}`;
}
