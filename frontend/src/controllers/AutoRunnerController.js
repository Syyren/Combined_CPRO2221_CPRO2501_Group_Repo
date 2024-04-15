import axios from "axios";

const API_URL = "http://localhost:8090/api";

export const saveScore = async (userId, score) => {
    try 
    {
        const res = await axios.post(`${API_URL}/autorunner/save-score/${userId}/${score}`);
        const response = res.data;
        console.log("Response from API:", response);
    } 
    catch (err) 
    {
        console.error("Error giving achievement:", err); //outputs in the event of an error fetching the categories
        return [];
    }
};