package com.brcg.coolcatgames.feature.achievements.repository;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.utils.AchievementValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;

@Repository
public class AchievementRepository
{
    //declaring the mongoRepository object for use within the achievement repository
    private AchievementMongoRepository mongoRepository;

    //autowiring the repository to work with the mongo repository interface
    @Autowired
    public AchievementRepository(AchievementMongoRepository mongoRepository) {
        this.mongoRepository = mongoRepository;
    }
    //initializing a list to hold the achievement objects in
    private final AchievementValidation validate = new AchievementValidation();
    private final String title = "Title";
    private final String description = "Description";

    public AchievementRepository() { }

    //method that returns all achievement objects in the list
    public List<Achievement> getAllAchievements()
    {
        return mongoRepository.findAll();
    }
    //method that filters through the achievement list by id and returns either a match or null
    public Achievement findById(int id)
    {
        Achievement achievement = mongoRepository.findById(id).orElse(null);
        validate.Achievement(achievement, id);
        return achievement;
    }
    //method that saves an achievement object to the list
    public Achievement save(Achievement achievement)
    {
        validate.String(title, achievement.getAchievementTitle());
        validate.String(description, achievement.getAchievementDescription());
        achievement.setAchievementId(getHighestAchievementID() + 1);
        return mongoRepository.save(achievement);
    }
    //method that updates and returns an updated achievement
    public Achievement update(int id, Achievement updatedData)
    {
        validate.String(title, updatedData.getAchievementTitle());
        validate.String(description, updatedData.getAchievementDescription());
        Achievement achievement = findById(id);
        validate.Achievement(achievement, id);
        achievement.setAchievementTitle(updatedData.getAchievementTitle());
        achievement.setAchievementDescription(updatedData.getAchievementDescription());
        return mongoRepository.save(achievement);
    }
    //method that deletes an achievement
    public String delete(int id)
    {
        Achievement achievement = findById(id);
        validate.Achievement(achievement, id);
        mongoRepository.delete(achievement);
        return "Achievement with id: " + id + " removed successfully.";
    }

    //function that gets the highest id in the db and returns it
    private int getHighestAchievementID()
    {
        List<Achievement> achievementList = getAllAchievements();
        int highestAchievementId = 0;
        Achievement maxAchievement = achievementList.stream()
                .max(Comparator.comparingInt(Achievement::getAchievementId))
                .orElse(null);
        if (maxAchievement != null)
        {
            highestAchievementId = maxAchievement.getAchievementId();
        }
        return highestAchievementId;
    }
}
