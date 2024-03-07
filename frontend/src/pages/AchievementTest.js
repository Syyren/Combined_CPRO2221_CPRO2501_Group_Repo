import Layout from "../components/Layout";
import React, { useState, useEffect } from 'react';
import AchievementNotification from "../components/achievements/AchievementNotification";
import "./AchievementTest.css";
import { getAchievements } from "../controllers/AchievementController";


export default function AchievementTest()
{
    //msetting the useStates for achievementTitle and achievements
    const [achievementTitle, setAchievementTitle] = useState('');
    const [achievementsList, setAchievementsList] = useState([]);
    
    const [dbAchievements, setDbAchievements] = useState([]);

    useEffect(() => 
    {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => 
    {
        const res = await getAchievements();
        setDbAchievements(res);
    }

    useEffect(() => 
    {
        if (dbAchievements && dbAchievements.length > 0) {
            dbAchievements.forEach(achievement => {
                console.log("In Test Page: ", achievement);
            });
        }
    }, [dbAchievements]);

    //on clicking the button, checks if the achievement is in the list and if not adds it and triggers the notification
    const buttonClick = (achievement) => 
    {
        if (!achievementsList.some(refAchievement => refAchievement.achievementId === achievement.achievementId))
        {
            const updatedAchievements = [...achievementsList, achievement];
            setAchievementsList(updatedAchievements);
            setAchievementTitle(achievement.achievementTitle);
        }
    };

    //removal button function for testing
    const removeAchievement = (achievement) => 
    {
        const updatedAchievements = achievementsList.filter(refAchievement => refAchievement.achievementId !== achievement.achievementId);
        setAchievementsList(updatedAchievements);
    };

    return (
        <Layout>
            <h2 className="display-4 mb-4">Achievement Test Page</h2>

            {/* notification component that pops up the achievement */}
            {achievementTitle && <AchievementNotification achievementTitle={achievementTitle} />}

            <div className="customContainer">
                <div className="buttons">
                    <div className="container mb-2">

                        {[...dbAchievements].map((achievement, index) => (
                            <li
                            key={index}>
                                <div className="mb-2">
                                    <button
                                    type="button"
                                    className="btn btn-primary me-1"
                                    style={{width: "150px"}}
                                    onClick={() => buttonClick(achievement)}>
                                        {achievement.achievementTitle}
                                    </button>
                                </div>
                            </li>
                        ))}

                    </div>
                </div>

                <div className="achievementsUnlocked">
                    <h3>Achievements Unlocked:</h3>
                    <ul className="list-group">
                        {[...achievementsList].map((achievement, index) => (
                            <li
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={index}>
                                {achievement.achievementTitle} - {achievement.achievementDescription}
                                <button 
                                type="button"
                                className="btn btn-warning"
                                onClick={() => removeAchievement(achievement)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout> 
    )
}