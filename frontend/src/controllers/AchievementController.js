import axios from "axios";
import { getPlayerById } from "./PlayerController";

const API_URL = "http://localhost:8090/api";

//function that pulls all categories from the database through the axios
export const getAchievements = async () => {
  try 
  {
    const res = await axios.get(`${API_URL}/achievement/get/all`);
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

//function that pulls an achievement via it's id
export const getAchievementById = async (achievementId) => {
  try
  {
    const res = await axios.get(`${API_URL}/achievement/get/${achievementId}`);
    const achievement = res.data;
    console.log("Achievement from API:", achievement);
    return achievement;
  }
  catch (err)
  {
    console.error("Error fetching achievement:", err); //outputs in the event of an error fetching the categories
    return null;
  }
}

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
  try 
  {
    const res = await axios.put(`${API_URL}/players/give-achievement/${userId}/${achievementId}`);
    const response = res.data;
    console.log("Response from API:", response);
  } 
  catch (err) 
  {
    console.error("Error giving achievement:", err); //outputs in the event of an error fetching the categories
    return [];
  }
};
