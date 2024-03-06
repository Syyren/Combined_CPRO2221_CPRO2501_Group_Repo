package com.brcg.coolcatgames.feature.achievements.service;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.repository.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AchievementService
{
    //injecting the achievementRepository bean with the autowired annotation
    @Autowired
    private AchievementRepository achievementRepository = new AchievementRepository();
    //method that passes the achievement object to the repository and saves it
    public Achievement saveAchievement(Achievement achievement)
    {
        return achievementRepository.save(achievement);
    }
    //passes an updated achievement with values to the repository
    public Achievement updateAchievement(int id, Achievement updatedData)
    {
        return achievementRepository.update(id, updatedData);
    }
    //method that pushes an id to the repository to delete a matching achievement
    public String delAchievement(int id)
    {
        return achievementRepository.delete(id);
    }
    //method that passes the id to the repository to pull a matching object
    public Achievement getById(int id)
    {
        return achievementRepository.findById(id);
    }
    //method that pulls all achievement objects from the repository
    public List<Achievement> getAllAchievements()
    {
        return achievementRepository.getAllAchievements();
    }
}