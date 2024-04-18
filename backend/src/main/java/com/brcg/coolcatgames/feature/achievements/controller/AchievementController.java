package com.brcg.coolcatgames.feature.achievements.controller;

import com.brcg.coolcatgames.feature.achievements.model.Achievement;
import com.brcg.coolcatgames.feature.achievements.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//allowing cross-origin connection
@CrossOrigin(origins = "*", allowedHeaders = "*")
//routing all the maps to be under this parent map
@RequestMapping("/api/achievement")
public class AchievementController
{
    //injecting achievementService bean to interface with the controller and repository
    @Autowired
    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    //inserts a new achievement into the "db" via the service
    @PostMapping("/create")
    public Achievement createAchievement(@RequestBody Achievement achievement)
    {
        return achievementService.saveAchievement(achievement);
    }
    //gets all achievements in the "db" from the service
    @GetMapping("/get/all")
    public List<Achievement> getAllAchievements()
    {
        return achievementService.getAllAchievements();
    }
    //endpoint that gets an achievement from the "db" via its id from the service
    @GetMapping("/get/{achievementId}")
    public Achievement getAchievementById(@PathVariable int achievementId)
    {
        return achievementService.getById(achievementId);
    }
    //endpoint that updates an achievement that already exists in the "db" by id through the service
    @PutMapping("/update/{achievementId}")
    public Achievement updateAchievement(@PathVariable int achievementId, @RequestBody Achievement updatedAchievement)
    {
        return achievementService.updateAchievement(achievementId, updatedAchievement);
    }
    //endpoint that deletes an achievement from the "db" by id via the service
    @DeleteMapping("/delete/{achievementId}")
    public String deleteAchievement(@PathVariable int achievementId)
    {
        return achievementService.delAchievement(achievementId);
    }
}