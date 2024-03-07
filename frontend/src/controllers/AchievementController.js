import React, { useState } from 'react';
import axios from 'axios';

const url = "http://localhost:8090/achievement";
const get = "/get";

//function that pulls all categories from the database through the axios
export const getAchievements = async () => 
{
    try 
    {
      const contacts = await axios.get(url + get + "all");
      console.log("Achievements from API:", contacts);
      return contacts.map(achievement => //returns a list of categories with their attributes tied to values
      ({ 
        achievementId: achievement.achievementId, 
        achievementName: achievement.achievementName,
        achievementDescription: achievement.achievementDescription
      }));
    } 
    catch (err) 
    {
      console.error('Error fetching achievements:', err); //outputs in the event of an error fetching the categories
      return [];
    }
};