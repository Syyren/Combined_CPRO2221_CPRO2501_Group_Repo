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
            <h2 className="text-center display-4 mb-4">Achievement Test Page</h2>

            {/* notification component that pops up the achievement */}
            {achievementTitle && <AchievementNotification achievementTitle={achievementTitle} />}

            {/* container that holds the content for the Test Page */}
            <div className="customContainer">
                <div className="buttons border border-2 border-primary rounded p-2">
                    <div className="container mb-2">

                        <h3 className="text-center mb-3">Achievements In Database:</h3>

                        {/* generates a list of buttons to add achievements to the achievement list*/}
                        <ul className="list-group">
                            {[...dbAchievements].map((achievement, index) => (
                                <li
                                className="list-group-flush d-flex justify-content-center align-items-center mb-2"
                                key={index}>
                                    <div>
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
                        </ul>
                    </div>
                </div>

                <div className="achievementsUnlocked border border-primary border-2 rounded p-2">

                    <h3 className="text-center mb-3">Achievements Unlocked:</h3>

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