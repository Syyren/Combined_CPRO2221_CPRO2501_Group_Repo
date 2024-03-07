import Layout from "../components/Layout";
import React, { useState } from 'react';
import AchievementNotification from "../components/achievements/AchievementNotification"


export default function AchievementTest()
{
    //msetting the useStates for achievementName and achievements
    const [achievementName, setAchievementName] = useState('');
    const [achievements, setAchievements] = useState([]);

    //temporary class with dummy data for the application
    class TempAchievement
    {
        constructor(achievementId, achievementName, achievementDescription)
        {
            this.achievementId = achievementId;
            this.achievementName = achievementName;
            this.achievementDescription = achievementDescription;
        }
    }
    //dummy data
    const achievement1 = new TempAchievement(1, "Achievement 1", "This is Achievement 1");
    const achievement2 = new TempAchievement(2, "Achievement 2", "This is Achievement 2");
    const achievement3 = new TempAchievement(3, "Achievement 3", "This is Achievement 3");

    //on clicking the button, checks if the achievement is in the list and if not adds it and triggers the notification
    const buttonClick = (achievement) => 
    {
        if (!achievements.some(refAchievement => refAchievement.achievementId === achievement.achievementId))
        {
            const updatedAchievements = [...achievements, achievement];
            setAchievements(updatedAchievements);
            setAchievementName(achievement.achievementName);
        }
    };

    //removal button function for testing
    const removeAchievement = (achievement) => 
    {
        const updatedAchievements = achievements.filter(refAchievement => refAchievement.achievementId !== achievement.achievementId);
        setAchievements(updatedAchievements);
    };

    return (
        <Layout>
            <h2 className="display-4 mb-4">Achievement Test Page</h2>

            {/* notification component that pops up the achievement */}
            {achievementName && <AchievementNotification achievementName={achievementName} />}

            <h3>Achievements Unlocked:</h3>
            <ul>
                {[...achievements].map((achievement, index) => (
                    <li key={index}>
                        {achievement.achievementName}
                    </li>
                ))}
            </ul>

            <div className="container">
                <button
                type="button"
                className="btn btn-primary"
                onClick={() => buttonClick(achievement1)}>
                    Achievement 1
                </button>
                <button 
                type="button"
                className="btn btn-warning"
                onClick={() => removeAchievement(achievement1)}>
                    Remove
                </button>
            </div>

            <div className="container">
                <button 
                type="button"
                className="btn btn-primary"
                onClick={() => buttonClick(achievement2)}>
                    Achievement 2
                </button>
                <button 
                type="button"
                className="btn btn-warning"
                onClick={() => removeAchievement(achievement2)}>
                    Remove
                </button>
            </div>

            <div className="container">
                <button 
                type="button"
                className="btn btn-primary"
                onClick={() => buttonClick(achievement3)}>
                    Achievement 3
                </button>
                <button 
                type="button"
                className="btn btn-warning"
                onClick={() => removeAchievement(achievement3)}>
                    Remove
                </button>
            </div>

        </Layout> 
    )
}