import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8090/api/achievement";

//function that pulls all categories from the database through the axios
export const getAchievements = async () => 
{
    try 
    {
      const res = await axios.get(`${API_URL}/get/all`);
      const achievements = res.data;
      console.log("Achievements from API:", achievements);
      return achievements
    } 
    catch (err)
    {
      console.error('Error fetching achievements:', err); //outputs in the event of an error fetching the categories
      return [];
    }
};