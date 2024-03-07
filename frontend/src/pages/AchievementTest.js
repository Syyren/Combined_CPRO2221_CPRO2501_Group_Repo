import Layout from "../components/Layout";
import React, { useState } from 'react';
import AchievementNotification from "../components/achievements/AchievementNotification"
import "../components/achievements/AchievementTest.css"


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
    const achievement1 = new TempAchievement(1, "Sleepy Time", "This is Achievement 1");
    const achievement2 = new TempAchievement(2, "Cat Whisperer", "This is Achievement 2");
    const achievement3 = new TempAchievement(3, "Dream Team", "This is Achievement 3");

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

            <div className="customContainer">
                <div className="buttons">
                    <div className="container mb-2">
                        <button
                        type="button"
                        className="btn btn-primary me-1"
                        style={{width: "150px"}}
                        onClick={() => buttonClick(achievement1)}>
                            {achievement1.achievementName}
                        </button>
                        <button 
                        type="button"
                        className="btn btn-warning"
                        onClick={() => removeAchievement(achievement1)}>
                            Remove
                        </button>
                    </div>

                    <div className="container mb-2">
                        <button 
                        type="button"
                        className="btn btn-primary me-1"
                        style={{width: "150px"}}
                        onClick={() => buttonClick(achievement2)}>
                            {achievement2.achievementName}
                        </button>
                        <button 
                        type="button"
                        className="btn btn-warning"
                        onClick={() => removeAchievement(achievement2)}>
                            Remove
                        </button>
                    </div>

                    <div className="container mb-2">
                        <button 
                        type="button"
                        className="btn btn-primary me-1"
                        style={{width: "150px"}}
                        onClick={() => buttonClick(achievement3)}>
                            {achievement3.achievementName}
                        </button>
                        <button 
                        type="button"
                        className="btn btn-warning"
                        onClick={() => removeAchievement(achievement3)}>
                            Remove
                        </button>
                    </div>
                </div>

                <div className="achievementsUnlocked">
                    <h3>Achievements Unlocked:</h3>
                    <ul>
                        {[...achievements].map((achievement, index) => (
                            <li key={index}>
                                {achievement.achievementName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout> 
    )
}