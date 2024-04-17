import React, { useState, useEffect } from "react";
import Icon from "../../images/body/bobahead.png"
import "./AchievementList.css";
import { useAuth } from "../../context/AuthContext";
import { getAchievementById, getUserAchievements } from "../../controllers/AchievementController";

const AchievementList = () => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [achievementsList, setAchievementsList] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            const achievementIdList = await getUserAchievements(currentUser.userId);
            const achievements = await Promise.all(achievementIdList.map(async (achievementId) => {
                return await getAchievementById(achievementId);
            }));
            setAchievementsList(achievements);
            setIsLoading(false);
        };

        fetchAchievements();
    }, [currentUser.userId]);

    function getGameDisplayName(unformattedGameName) {
        const gameNames = {
          hangman: "Hangman",
          tictactoe: "Tic Tac Toe",
          "cat-run": "Cat Run!",
          canine_invaders: "Canine Invaders",
        };
    
        return gameNames[unformattedGameName] || "Game";
      }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h2>{currentUser.username}'s Achievements:</h2>
            <ul className="list-group">
                {achievementsList.map((achievement) => (
                    <li key={achievement.achievmentId} className="list-group-item achievement-item justify-content-center">
                        <div className="achievement-display-body d-flex align-items-center">
                            <img src={Icon} alt="Achievement Icon" className="icon" />
                            <div className="achievement-info">
                                <p className="achievement-title">{achievement.achievementTitle}</p>
                                <p className="achievement-game">{getGameDisplayName(achievement.gameName)}</p>
                                <p className="achievement-description">{achievement.achievementDescription}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AchievementList;
