package com.brcg.coolcatgames.feature.achievements.repository;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.utils.AchievementValidation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AchievementRepository
{
    private MongoRepository<Achievement, Integer> mongoRepository;
    //initializing the achievementId counter to track inputted ids in ascending order as they're entered automatically
    private int achievementIdCounter = getHighestAchievementID() + 1;
    //initializing a list to hold the achievement objects in
    private final AchievementValidation validate = new AchievementValidation();
    private final List<Achievement> list = new ArrayList<>();
    //method that returns all achievement objects in the list
    public List<Achievement> getAllAchievements()
    {
        // TODO: validate.List(list);
        return mongoRepository.findAll();
    }
    //method that filters through the achievement list by id and returns either a match or null
    public Achievement findById(int id)
    {
        Achievement achievement = mongoRepository.findById(id).orElse(null);
        // TODO: validate.Achievement(achievement, id)
        return achievement;
    }
    //method that saves an achievement object to the list
    public Achievement save(Achievement achievement)
    {
        // TODO: validate inserted achievement details here
        achievement.setAchievementId(achievementIdCounter++);
        achievement.setAchievementEarnedDate(LocalDateTime.now());
        list.add(achievement);
        return achievement;
    }
    //method that updates and returns an updated achievement
    public Achievement update(int id, Achievement updatedData)
    {
        // TODO: validate each variable of updatedData
        Achievement achievement = list.stream()
                .filter(a -> a.getAchievementId() == id)
                .findAny()
                .orElse(null);
        // TODO: validate Achievement(achievement, id)
        // TODO: achievement.set every variable
        return achievement;
    }
    //method that deletes an achievement
    public String delete(int id)
    {
        Achievement achievement = list.stream()
                .filter(a -> a.getAchievementId() == id)
                .findAny()
                .orElse(null);
        // TODO: validate Achievement(achievement, id) or something to that effect
        list.removeIf(a -> a.getAchievementId() == id);
        return "Achievement with id: " + id + " removed successfully.";
    }

    //function that gets the highest id in the db and pulls it
    private int getHighestAchievementID()
    {
        List<Achievement> achievementList = getAllAchievements();
        int highestAchievementId = 0;
        Achievement maxAchievement = achievementList.stream()
                .max((a1, a2) -> Integer.compare(a1.getAchievementId(), a2.getAchievementId()))
                .orElse(null);
        if (maxAchievement != null)
        {
            highestAchievementId = maxAchievement.getAchievementId();
        }
        return highestAchievementId;
    }
}
