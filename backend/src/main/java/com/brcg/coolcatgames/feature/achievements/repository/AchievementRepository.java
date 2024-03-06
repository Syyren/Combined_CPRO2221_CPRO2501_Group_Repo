package com.brcg.coolcatgames.feature.achievements.repository;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.utils.AchievementValidation;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AchievementRepository
{
    //initializing the achievementId counter to track inputted ids in ascending order as they're entered automatically
    private int achievementIdCounter = 1;
    //initializing a list to hold the achievement objects in
    private final AchievementValidation validate = new AchievementValidation();
    private final List<Achievement> list = new ArrayList<>();
    //method that returns all achievement objects in the list
    public List<Achievement> getAllAchievements()
    {
        // TODO: validate.List(list);
        return list;
    }
    //method that filters through the achievement list by id and returns either a match or null
    public Achievement findById(int id)
    {
        Achievement achievement = list.stream()
                .filter(a -> a.getAchievementId() == id)
                .findAny()
                .orElse(null);
        // TODO: validate.Achievement(achievement, id);
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
}
