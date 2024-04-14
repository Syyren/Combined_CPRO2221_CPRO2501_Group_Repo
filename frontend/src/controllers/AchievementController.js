import axios from "axios";
import { getPlayerById } from "./PlayerController";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:8090/api";

//function that pulls all categories from the database through the axios
export const getAchievements = async () => {
  const { currentUser } = useAuth();
  try 
  {
    const res = await axios.get(`${API_URL}/achievement/get/all`, {
      headers: { Authorization: `Bearer ${currentUser.jwt}` },
    });
    const achievements = res.data;
    console.log("Achievements from API:", achievements);
    return achievements;
  } 
  catch (err) 
  {
    console.error("Error fetching achievements:", err); //outputs in the event of an error fetching the categories
    return [];
  }
};

export const getUserAchievements = async (userId) => {
  try
  {
    const player = await getPlayerById(userId);
    return player.achievements;
  }
  catch (err)
  {
    console.error("Error fetching user's achievements:", err); //outputs in the event of an error fetching the categories
    return [];
  }
}

export const giveAchievement = async (userId, achievementId) => {
  const { currentUser } = useAuth();
  try 
  {
    const res = await axios.put(`${API_URL}/players/give-achievement/${userId}/${achievementId}`, {
      headers: { Authorization: `Bearer ${currentUser.jwt}` },
    });
    const response = res.data;
    console.log("Response from API:", response);
  } 
  catch (err) 
  {
    console.error("Error giving achievement:", err); //outputs in the event of an error fetching the categories
    return [];
  }
};
